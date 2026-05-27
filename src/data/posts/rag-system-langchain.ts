import { AUTHOR_VASUDEV } from "./author";

export const post = {
  id: "22",
  slug: "rag-system-langchain",
  title: "Building a RAG System with LangChain and ChromaDB",
  excerpt: "Give your LLM access to your own documents with a production-ready RAG pipeline using LangChain and ChromaDB.",
  content: `
# Building a RAG System with LangChain and ChromaDB

## What is RAG?

Retrieval-Augmented Generation (RAG) is the most important pattern in applied LLM engineering today. Instead of relying solely on what a model learned during training, RAG retrieves relevant documents from your own knowledge base and injects them into the LLM's context window at inference time.

The benefits are transformative:

- **Grounding:** The LLM responds based on your actual data, not its training data.
- **Freshness:** Update your knowledge base without retraining the model.
- **Attribution:** You can trace every answer back to the source document.
- **Cost:** Store petabytes of data in a vector database for a fraction of the cost of fine-tuning.

In this tutorial, we will build a production-ready RAG system using LangChain for orchestration and ChromaDB as the vector store.

## Architecture Overview

A RAG system has three main stages:

1. **Ingestion:** Load documents, split them into chunks, generate embeddings, and store them in a vector database.
2. **Retrieval:** Given a user query, embed it and find the most semantically similar document chunks.
3. **Generation:** Feed the retrieved chunks into an LLM prompt and generate a grounded response.

Here is the flow:

\`\`\`
Documents → Loader → Splitter → Embedding Model → Vector Store
                                                      ↓
User Query → Embedding Model → Similarity Search → Retrieved Chunks
                                                      ↓
                                          Prompt Template + LLM → Response
\`\`\`

## Project Setup

Create a new project and install dependencies:

\`\`\`bash
mkdir rag-system
cd rag-system
python -m venv venv
source venv/bin/activate
\`\`\`

\`\`\`bash
pip install langchain langchain-community langchain-chroma chromadb
pip install pypdf python-dotenv
pip install sentence-transformers
pip install ollama
\`\`\`

Create a \`.env\` file:

\`\`\`env
# Choose your embedding model source
EMBEDDING_MODEL=all-MiniLM-L6-v2
# For OpenAI embeddings, set:
# OPENAI_API_KEY=sk-...
\`\`\`

## Document Loading

LangChain provides document loaders for dozens of formats. We will handle PDFs, websites, and code files.

### PDF Loader

\`\`\`python
from langchain_community.document_loaders import PyPDFLoader

loader = PyPDFLoader("path/to/your/document.pdf")
documents = loader.load()
print(f"Loaded {len(documents)} pages")
\`\`\`

### Website Loader

\`\`\`python
from langchain_community.document_loaders import WebBaseLoader

urls = [
    "https://docs.langchain.com/docs/",
    "https://docs.chromadb.com/"
]
loader = WebBaseLoader(urls)
documents = loader.load()
\`\`\`

### Code Loader

\`\`\`python
from langchain_community.document_loaders import TextLoader
from pathlib import Path

code_files = Path("./src").rglob("*.py")
documents = []
for file in code_files:
    loader = TextLoader(str(file))
    documents.extend(loader.load())
\`\`\`

## Text Splitting

Raw documents are too large for LLM context windows and too coarse for precise retrieval. Splitting is critical.

### Recursive Character Splitter

This is the default choice for most text:

\`\`\`python
from langchain.text_splitter import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100,
    separators=["\\n\\n", "\\n", " ", ""],
)
chunks = text_splitter.split_documents(documents)
print(f"Created {len(chunks)} chunks")
\`\`\`

### Semantic Chunking

For better coherence, split at natural boundaries like paragraphs or sections:

\`\`\`python
from langchain.text_splitter import MarkdownHeaderTextSplitter

splitter = MarkdownHeaderTextSplitter(
    headers_to_split_on=[("#", "Header 1"), ("##", "Header 2")]
)
chunks = splitter.split_text(markdown_document)
\`\`\`

Each chunk retains its header hierarchy as metadata, enabling hierarchical retrieval.

## Embedding Models

Embeddings convert text into numerical vectors. The choice of embedding model directly impacts retrieval quality.

### Local Embeddings with Sentence Transformers

\`\`\`python
from langchain_community.embeddings import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(
    model_name="all-MiniLM-L6-v2",
    model_kwargs={"device": "cpu"},
    encode_kwargs={"normalize_embeddings": True},
)
\`\`\`

### Local Embeddings with Ollama

\`\`\`python
from langchain_community.embeddings import OllamaEmbeddings

embeddings = OllamaEmbeddings(model="nomic-embed-text")
\`\`\`

### API-Based Embeddings

\`\`\`python
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
\`\`\`

Local models are free and private but produce slightly lower quality than API-based alternatives. For production, benchmark both.

## Vector Store Configuration

ChromaDB is an open-source vector database that runs embedded (in-process) or as a client-server.

### Embedded Chroma (simplest)

\`\`\`python
from langchain_chroma import Chroma

vector_store = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db",
)
\`\`\`

### Chroma Client-Server (production)

Start the Chroma server:

\`\`\`bash
pip install chromadb
chroma run --path ./chroma_db --port 8000
\`\`\`

Then connect from your application:

\`\`\`python
import chromadb
from langchain_chroma import Chroma

chroma_client = chromadb.HttpClient(host="localhost", port=8000)
collection = chroma_client.get_or_create_collection("my_docs")

vector_store = Chroma(
    client=chroma_client,
    collection_name="my_docs",
    embedding_function=embeddings,
)
\`\`\`

### Adding Metadata

Metadata enables filtering before retrieval, significantly improving relevance:

\`\`\`python
vector_store.add_documents(
    documents=chunks,
    ids=[f"doc_{i}" for i in range(len(chunks))],
    metadatas=[
        {
            "source": chunk.metadata.get("source", "unknown"),
            "page": chunk.metadata.get("page", 0),
            "category": "technical_doc",
        }
        for chunk in chunks
    ],
)
\`\`\`

## Retrieval Strategies

The retrieval strategy determines what gets sent to the LLM. Different strategies suit different use cases.

### Similarity Search (default)

\`\`\`python
retriever = vector_store.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 4},
)
results = retriever.invoke("What is the embedding dimension?")
\`\`\`

### Maximum Marginal Relevance (MMR)

MMR balances relevance with diversity, avoiding near-duplicate results:

\`\`\`python
retriever = vector_store.as_retriever(
    search_type="mmr",
    search_kwargs={"k": 4, "fetch_k": 20, "lambda_mult": 0.5},
)
\`\`\`

### Hybrid Search (dense + sparse)

For better keyword matching, combine dense embeddings with BM25:

\`\`\`python
from langchain.retrievers import EnsembleRetriever
from langchain.retrievers import BM25Retriever

bm25_retriever = BM25Retriever.from_documents(chunks)
bm25_retriever.k = 4

dense_retriever = vector_store.as_retriever(
    search_kwargs={"k": 4}
)

ensemble = EnsembleRetriever(
    retrievers=[bm25_retriever, dense_retriever],
    weights=[0.3, 0.7],
)
\`\`\`

### Multi-Query Retrieval

Generate multiple variations of the user query to capture different angles:

\`\`\`python
from langchain.retrievers.multi_query import MultiQueryRetriever

multi_query_retriever = MultiQueryRetriever.from_llm(
    retriever=retriever,
    llm=llm,
)
\`\`\`

### Contextual Compression

After retrieval, compress the context to fit more relevant information:

\`\`\`python
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor

compressor = LLMChainExtractor.from_llm(llm)
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=retriever,
)
\`\`\`

## Prompt Templates

The prompt structure defines how retrieved context is presented to the LLM.

### Basic RAG Prompt

\`\`\`python
from langchain.prompts import ChatPromptTemplate

template = """You are a helpful assistant that answers questions based on the provided context.

Context:
{context}

Question: {question}

Answer the question using only the provided context. If the context does not contain the answer, say "I cannot find this information in the provided documents.""""

prompt = ChatPromptTemplate.from_template(template)
\`\`\`

### Advanced Prompt with Citations

\`\`\`python
template = """You are a document analyst. Answer the question using the context below.

For each piece of information you use, cite the source document in brackets [Source: filename.pdf, page X].

Context:
{context}

Question: {question}

Answer:"""

prompt = ChatPromptTemplate.from_template(template)
\`\`\`

## Building the Chain

Now we wire everything together.

### Local LLM with Ollama

\`\`\`python
from langchain_community.chat_models import ChatOllama
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

llm = ChatOllama(
    model="llama3.2:3b",
    temperature=0.0,
    num_predict=2048,
)

def format_docs(docs):
    return "\\n\\n".join(f"[{d.metadata.get('source', 'unknown')}]\\n{d.page_content}" for d in docs)

rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

response = rag_chain.invoke("How do I install ChromaDB?")
print(response)
\`\`\`

### Streaming Responses

For a chat-like experience, stream the output:

\`\`\`python
for chunk in rag_chain.stream("What is the embedding dimension?"):
    print(chunk, end="", flush=True)
\`\`\`

## Building a Chat Interface

Add conversation memory so users can ask follow-up questions:

\`\`\`python
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain

memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True,
    output_key="answer",
)

qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever,
    memory=memory,
    verbose=True,
)

result = qa_chain({"question": "What is RAG?"})
print(result["answer"])

result = qa_chain({"question": "How do I install it?"})
print(result["answer"])
\`\`\`

### FastAPI Server

Expose your RAG system as an API:

\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Query(BaseModel):
    question: str

@app.post("/ask")
async def ask(query: Query):
    response = rag_chain.invoke(query.question)
    return {"answer": response, "sources": documents}

@app.post("/chat")
async def chat(query: Query):
    result = qa_chain({"question": query.question})
    return {
        "answer": result["answer"],
        "sources": result.get("source_documents", []),
    }
\`\`\`

## Evaluation

Do not deploy a RAG system without evaluating it. Here is a minimal evaluation pipeline:

\`\`\`python
from langchain.evaluation import load_evaluator
from datasets import Dataset

# Test questions with expected answers
test_set = [
    {"question": "What is RAG?", "expected": "Retrieval-Augmented Generation"},
    {"question": "How do embeddings work?", "expected": "Vectors representing meaning"},
]

evaluator = load_evaluator("qa")

results = []
for item in test_set:
    response = rag_chain.invoke(item["question"])
    score = evaluator.evaluate_strings(
        prediction=response,
        reference=item["expected"],
    )
    results.append({
        "question": item["question"],
        "response": response,
        "score": score,
    })
\`\`\`

### Metrics to Track

- **Faithfulness:** Does the response contradict the retrieved context?
- **Relevance:** Is the retrieved context actually relevant to the question?
- **Precision / Recall:** Of the retrieved documents, how many are useful?
- **Latency:** P95 response time for the full pipeline.
- **Context utilization:** How many of the retrieved chunks are actually cited?

## Production Considerations

### Scalability

- **Batch ingestion:** Process documents in parallel using \`ThreadPoolExecutor\` or async loaders.
- **Sharded vector stores:** For millions of documents, shard ChromaDB across multiple instances.
- **Caching:** Cache embeddings for frequently asked questions to reduce latency.

### Monitoring

- **Log every query and response.** Store them in a database for analysis.
- **Track retrieval latency** separately from generation latency.
- **Set up alerts** for empty retrieval results (no context found) and high-latency queries.

### Security

- **Sanitize document content** before ingestion — remove sensitive data.
- **Rate-limit the API** to prevent abuse.
- **Authenticate API requests** if the system serves internal documents.

### Cost Optimization

- **Use local embedding models** for high-volume ingestion.
- **Batch API calls** to embedding providers.
- **Cache responses** for identical queries (common in customer support).
- **Limit context window size** — 4 chunks is often sufficient; 10 is rarely better.

## Conclusion

We built a complete RAG system: document ingestion, chunking, embedding, vector storage, retrieval, prompt construction, and a chat interface. This architecture scales from a personal knowledge base to enterprise document search.

The key takeaway is this: RAG is not a single technique but a spectrum of choices. Local models for privacy and cost. MMR for diverse results. Ensemble retrieval for precision. Streaming for user experience. Each knob can be tuned for your specific use case.

LangChain and ChromaDB give you the building blocks. Now go build something that makes your LLM actually useful with your own data.
  `,
  coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  date: "2026-05-20",
  readingTime: "15 min read",
  category: "Artificial Intelligence",
  tags: ["RAG", "LangChain", "ChromaDB", "LLM", "Tutorial"],
  author: AUTHOR_VASUDEV
};
