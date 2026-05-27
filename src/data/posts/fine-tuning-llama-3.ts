import { AUTHOR_VASUDEV } from "./author";

export const post = {
  id: "18",
  slug: "fine-tuning-llama-3",
  title: "Fine-Tuning Llama 3 on Custom Data: A Beginner's Guide",
  excerpt: "Learn how to fine-tune Llama 3 on your own dataset using LoRA, QLoRA, and Unsloth — no expensive hardware required.",
  content: `
# Fine-Tuning Llama 3 on Custom Data: A Beginner's Guide

Fine-tuning is one of the most powerful techniques in the LLM toolbox. It allows you to take a base model like Llama 3 and specialize it for your domain, tone, or task. But for beginners, the process can feel overwhelming.

This guide walks you through everything: from understanding when to fine-tune versus using RAG, to preparing your dataset, running LoRA with Unsloth, converting to GGUF, and deploying in Ollama.

---

## 1. Fine-Tuning vs RAG vs Prompt Engineering

Before writing any code, you need to pick the right strategy.

| Approach | Best For | Effort | Quality |
|---|---|---|---|
| **Prompt Engineering** | Simple tasks, general knowledge | None | Baseline |
| **RAG (Retrieval Augmented Generation)** | Answering questions over private documents | Medium | High for factual recall |
| **Fine-Tuning** | Changing model behavior, tone, or style | High | Best for specialized tasks |
| **Full Pre-training** | Creating a new model from scratch | Extremely High | Rarely needed |

**When to fine-tune:**
- You want the model to consistently output a specific format (JSON, markdown, custom schema)
- You need the model to adopt a specific persona or tone
- You have labeled data pairs (instruction → response) and want to improve accuracy on a task

**When NOT to fine-tune:**
- You just need the model to know facts from your documents — use RAG instead
- You have fewer than 100 high-quality examples — prompt engineering is sufficient
- You cannot verify the quality of your training data — garbage in, garbage out

---

## 2. Prerequisites: Hardware and Software

### Minimum Hardware

| Method | RAM | VRAM | Storage |
|---|---|---|---|
| LoRA (7B model) | 16 GB | 12 GB | 20 GB |
| QLoRA (7B model) | 12 GB | 6 GB | 15 GB |
| QLoRA (3B model) | 8 GB | 4 GB | 10 GB |
| Full fine-tune (7B) | 64 GB | 48 GB | 30 GB |

**Recommendation:** If you have a consumer GPU (RTX 3060 12GB, RTX 4060, etc.), use QLoRA on a 3B or 7B model. If you have an RTX 4090 (24GB+), LoRA on 7B or 13B is possible.

### Software Stack

\`\`\`bash
# Python 3.10+ recommended
conda create -n finetune python=3.10
conda activate finetune

# Core dependencies
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install transformers datasets accelerate peft bitsandbytes
pip install unsloth
pip install wandb  # optional, for experiment tracking
\`\`\`

---

## 3. Dataset Preparation

Fine-tuning requires a dataset in instruction-following format. The most common format is a JSONL file where each line is a conversation.

### Format: ShareGPT / ChatML

\`\`\`jsonl
{"messages": [{"role": "system", "content": "You are a helpful AI assistant specialized in Python."}, {"role": "user", "content": "Write a function to reverse a linked list."}, {"role": "assistant", "content": "Here is a Python function to reverse a singly linked list:\\n\\n\\\\\`\\\\\`\\\\\`python\\nclass ListNode:\\n    def __init__(self, val=0, next=None):\\n        self.val = val\\n        self.next = next\\n\\ndef reverseList(head: ListNode) -> ListNode:\\n    prev = None\\n    curr = head\\n    while curr:\\n        next_temp = curr.next\\n        curr.next = prev\\n        prev = curr\\n        curr = next_temp\\n    return prev\\n\\\\\`\\\\\`\\\\\`\\n\\nThis runs in O(n) time and O(1) space."}]}
\`\`\`

### Dataset Size Guidelines

| Dataset Size | Quality | Overfitting Risk |
|---|---|---|
| 50–200 examples | Small, good for style transfer | High |
| 500–2,000 examples | Medium, good for task adaptation | Moderate |
| 5,000+ examples | Large, general improvement | Low |

**Pro tip:** Quality over quantity. 500 manually verified examples beat 10,000 scraped ones every time.

### Loading your dataset

\`\`\`python
from datasets import load_dataset

dataset = load_dataset("json", data_files="my_data.jsonl", split="train")
dataset = dataset.train_test_split(test_size=0.1)
\`\`\`

---

## 4. Using Unsloth for Fast Training

[Unsloth](https://github.com/unslothai/unsloth) is a library that dramatically speeds up fine-tuning while reducing memory usage. It works with Llama 3, Mistral, Qwen, and many other models.

### Loading the Model

\`\`\`python
from unsloth import FastLanguageModel
import torch

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/Llama-3.2-3B-Instruct",
    max_seq_length=2048,
    dtype=None,  # Auto-detect
    load_in_4bit=True,  # QLoRA
)

model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                    "gate_proj", "up_proj", "down_proj"],
    lora_alpha=16,
    lora_dropout=0,
    bias="none",
    use_gradient_checkpointing="unsloth",
    random_state=42,
)
\`\`\`

**Key parameters explained:**
- **r (rank):** 8–32 is the sweet spot. Higher = more expressiveness, more memory.
- **lora_alpha:** Scaling factor. Usually set to 2x r (e.g., r=16, alpha=32).
- **load_in_4bit:** Enables QLoRA. Cuts memory by ~4x versus 16-bit.
- **target_modules:** Which attention layers to apply LoRA to. The list above covers all linear layers in Llama 3 architecture.

---

## 5. LoRA vs QLoRA vs Full Fine-Tuning

| Method | Trainable Params | VRAM (7B) | Speed | Quality |
|---|---|---|---|---|
| **Full Fine-Tune** | 100% (7B) | 48 GB+ | Slow | Best |
| **LoRA** | ~1% (70M) | 14 GB | Fast | Near-best |
| **QLoRA** | ~1% (70M) | 6 GB | Medium | ~95% of LoRA |
| **DoRA** | ~1% (70M) | 7 GB | Medium | ~98% of LoRA |

**Recommendation:** Start with QLoRA. It is the most accessible. If you have headroom, switch to LoRA for slightly better quality. Full fine-tuning is rarely worth the cost.

---

## 6. Training Configuration

\`\`\`python
from transformers import TrainingArguments
from trl import SFTTrainer

training_args = TrainingArguments(
    output_dir="./llama3-finetuned",
    per_device_train_batch_size=2,
    gradient_accumulation_steps=4,
    warmup_steps=5,
    num_train_epochs=3,
    learning_rate=2e-4,
    fp16=not torch.cuda.is_bf16_supported(),
    bf16=torch.cuda.is_bf16_supported(),
    logging_steps=10,
    save_strategy="epoch",
    optim="adamw_8bit",
    seed=42,
)

trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
    args=training_args,
    dataset_text_field="text",
    max_seq_length=2048,
)

trainer.train()
\`\`\`

### Important Hyperparameters

| Parameter | Recommended | Notes |
|---|---|---|
| **learning_rate** | 1e-4 to 3e-4 | Lower for full fine-tune (~1e-5) |
| **num_train_epochs** | 2–5 | Monitor eval loss for overfitting |
| **batch_size** | 1–4 per GPU | Use gradient_accumulation to compensate |
| **warmup_steps** | 5–10% of total | Helps stabilize training |
| **optimizer** | AdamW 8-bit | Saves VRAM over full AdamW |

---

## 7. Running Training

\`\`\`bash
python train.py
\`\`\`

If using QLoRA on an RTX 3060 12GB with Llama 3.2 3B, expect:
- **Training time:** ~30–60 minutes for 500 examples
- **Peak VRAM:** ~5–6 GB
- **Loss curve:** Should steadily decrease; eval loss should not increase (sign of overfitting)

### Monitoring with W&B

\`\`\`bash
pip install wandb
wandb login
\`\`\`

Uncomment the \`report_to="wandb"\` in TrainingArguments to see live loss curves.

---

## 8. Evaluating Your Model

After training, test your model on held-out examples:

\`\`\`python
from unsloth import FastLanguageModel

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="./llama3-finetuned",
    max_seq_length=2048,
    load_in_4bit=True,
)
FastLanguageModel.for_inference(model)

messages = [{"role": "user", "content": "Explain what fine-tuning is in one sentence."}]
inputs = tokenizer.apply_chat_template(messages, tokenize=True, add_generation_prompt=True, return_tensors="pt").to("cuda")

outputs = model.generate(
    input_ids=inputs,
    max_new_tokens=128,
    temperature=0.7,
    top_p=0.9,
)
print(tokenizer.decode(outputs[0]))
\`\`\`

**Checklist for evaluation:**
- Does the output match the desired format?
- Is the tone correct?
- Does it hallucinate less than the base model?
- Run on 20–50 test examples and score manually.

---

## 9. Converting to GGUF

To use your fine-tuned model in Ollama or LM Studio, convert it to GGUF format.

### Merge LoRA weights first

\`\`\`python
model = model.merge_and_unload()
model.save_pretrained("./llama3-merged")
tokenizer.save_pretrained("./llama3-merged")
\`\`\`

### Convert using llama.cpp

\`\`\`bash
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
pip install -r requirements.txt

python convert_hf_to_gguf.py ../llama3-merged --outfile llama3-finetuned.gguf --outtype q4_k_m
\`\`\`

The \`q4_k_m\` quantization offers a great quality-to-size ratio (roughly 4GB for a 7B model).

---

## 10. Running in Ollama / LM Studio

### Ollama

Create a Modelfile:

\`\`\`dockerfile
FROM ./llama3-finetuned.gguf

TEMPLATE """{{ .Prompt }}"""

PARAMETER temperature 0.7
PARAMETER top_p 0.9
PARAMETER stop "<|eot_id|>"
\`\`\`

Then:

\`\`\`bash
ollama create my-finetuned-model -f Modelfile
ollama run my-finetuned-model
\`\`\`

### LM Studio

Open LM Studio, go to "My Models", click "Add Model", and select your GGUF file. It will be available in the chat interface and the API server.

---

## 11. Common Issues and Fixes

### Out of Memory (OOM)

| Symptom | Fix |
|---|---|
| CUDA OOM during training | Reduce batch size to 1, use gradient_accumulation |
| CUDA OOM during loading | Use \`load_in_4bit=True\` |
| System RAM OOM | Use \`load_in_4bit=True\` with \`device_map="auto"\` |

### Overfitting

| Symptom | Fix |
|---|---|
| Eval loss increases | Reduce epochs, add dropout, reduce r |
| Model repeats training data | Epochs too high, dataset too small |
| Model loses general knowledge | Add general knowledge examples to dataset |

### Poor Quality

| Symptom | Fix |
|---|---|
| Outputs are garbled | Check tokenizer chat template |
| Model ignores instructions | Dataset format is wrong; use ShareGPT format |
| Model is too verbose | Add system prompt examples in training data |

---

## 12. Advanced Tips

- **Mix datasets:** Combine your custom data with a small percentage of general instruction data (e.g., OpenHermes 2.5) to prevent catastrophic forgetting.
- **Learning rate scheduling:** Use cosine or linear decay. Constant LR works but is suboptimal.
- **DeepSpeed / FSDP:** For multi-GPU setups, use DeepSpeed ZeRO-3 or FSDP. Unsloth supports both.
- **Dataset augmentation:** Use an LLM (like GPT-4 or Claude) to generate additional high-quality examples in your domain.

---

## Conclusion

Fine-tuning Llama 3 is accessible to anyone with a modern GPU and a bit of Python knowledge. With QLoRA and Unsloth, you can train a specialized model in under an hour on consumer hardware.

The workflow is straightforward:

1. Prepare your dataset (JSONL, ChatML format)
2. Load model with QLoRA via Unsloth
3. Train with SFTTrainer
4. Merge and convert to GGUF
5. Run in Ollama or LM Studio

Your fine-tuned model will be faster, cheaper, and more private than any cloud API. In 2026, that is a superpower.
  `,
  coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
  date: "2026-05-22",
  readingTime: "15 min read",
  category: "Artificial Intelligence",
  tags: ["Fine-Tuning", "Llama 3", "Machine Learning", "Tutorial"],
  author: AUTHOR_VASUDEV
};
