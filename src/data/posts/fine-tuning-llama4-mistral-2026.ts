import { AUTHOR_VASUDEV } from "./author";

export const post = {
  id: "36",
  slug: "fine-tuning-llama4-mistral-2026",
  title: "Fine-Tuning LLMs in 2026: LoRA, QLoRA for Llama 4 and Mistral — Complete Guide",
  excerpt: "Ultimate guide to fine-tuning large language models in 2026. Covers LoRA, QLoRA, DoRA techniques for Llama 4, Mistral Large 2, and Phi-4 with production-ready code examples.",
  content: `
# Fine-Tuning LLMs in 2026: LoRA, QLoRA for Llama 4 and Mistral — Complete Guide

Fine-tuning has evolved dramatically. In 2026, you can fine-tune a 100B+ parameter model on a single consumer GPU using parameter-efficient techniques like LoRA, QLoRA, and the new DoRA. This guide covers everything you need to ship a custom fine-tuned model.

---

## Why Fine-Tune?

| Approach | Quality | Cost | Data Needed |
|---|---|---|---|
| **Prompt engineering** | Baseline | Free | 0 |
| **RAG** | Good + grounded | Low | Documents |
| **Fine-tuning** | Excellent | Medium | 500-5000 examples |
| **Full training** | Best | Very high | Millions |

Fine-tuning excels at:
- **Domain adaptation** — medical, legal, financial language
- **Format control** — always output JSON, follow specific templates
- **Behavior shaping** — tone, style, safety guardrails
- **Performance boost** — +5-15% on domain-specific tasks

---

## Parameter-Efficient Fine-Tuning (PEFT) Methods

### LoRA (Low-Rank Adaptation)

LoRA adds trainable low-rank matrices to attention layers. Only 0.1-1% of parameters are trained.

\`\`\`bash
# Original: W (dense) = 4096x4096 = 16.8M params
# LoRA: A (4096x16) + B (16x4096) = 131K params
# That's 0.78% of original!
\`\`\`

### QLoRA (Quantized LoRA)

QLoRA combines 4-bit quantization with LoRA:

\`\`\`python
from transformers import BitsAndBytesConfig
import torch

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,
    bnb_4bit_compute_dtype=torch.bfloat16
)
\`\`\`

**Memory savings**: QLoRA fits a 70B model in 48GB vs 280GB for full fine-tuning.

### DoRA (Weight-Decomposed Low-Rank Adaptation)

DoRA (new in 2026) decomposes weights into magnitude and direction:

| Method | Trainable Params | Memory (70B model) | Performance vs Full FT |
|---|---|---|---|
| Full FT | 70B | 280 GB | 100% |
| LoRA | 0.1-1% | 140 GB | 90-95% |
| QLoRA | 0.1-1% | 48 GB | 88-93% |
| **DoRA** | 0.1-1% | 48 GB | **94-98%** |

---

## Step-by-Step: Fine-Tune Llama 4 with QLoRA

### Step 1: Setup

\`\`\`bash
pip install torch transformers accelerate peft trl bitsandbytes unsloth
\`\`\`

### Step 2: Load Model with QLoRA

\`\`\`python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from transformers import BitsAndBytesConfig

model_name = "meta-llama/Llama-4-Scout"

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,
    bnb_4bit_compute_dtype=torch.bfloat16,
)

model = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True,
)

model = prepare_model_for_kbit_training(model)
\`\`\`

### Step 3: Configure LoRA

\`\`\`python
lora_config = LoraConfig(
    r=16,           # Rank of LoRA matrices
    lora_alpha=32,  # Scaling factor
    target_modules=[
        "q_proj", "k_proj", "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj"
    ],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM",
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# Only 0.12% of total parameters are trainable!
\`\`\`

### Step 4: Prepare Dataset

\`\`\`python
from datasets import Dataset

# Format: instruction + input + output
training_data = [
    {
        "instruction": "Translate this code from Python to TypeScript",
        "input": "def add(a, b): return a + b",
        "output": "const add = (a: number, b: number): number => a + b;"
    },
    # ... more examples
]

def format_chat(example):
    return {
        "text": f"""<|begin_of_text|><|start_header_id|>user<|end_header_id|>
{example['instruction']}

{example['input']}<|eot_id|>
<|start_header_id|>assistant<|end_header_id|>
{example['output']}<|eot_id|>"""
    }

dataset = Dataset.from_list(training_data)
dataset = dataset.map(format_chat)
\`\`\`

### Step 5: Train

\`\`\`python
from trl import SFTTrainer
from transformers import TrainingArguments

trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    args=TrainingArguments(
        output_dir="./llama4-scout-coder-lora",
        per_device_train_batch_size=4,
        gradient_accumulation_steps=4,
        num_train_epochs=3,
        learning_rate=2e-4,
        fp16=True,
        logging_steps=10,
        save_steps=100,
        optim="paged_adamw_8bit",
    ),
    tokenizer=tokenizer,
    max_seq_length=2048,
)

trainer.train()
\`\`\`

### Step 6: Save and Merge

\`\`\`python
# Save LoRA weights
model.save_pretrained("./llama4-scout-coder-lora")

# Merge with base model for inference
from peft import PeftModel

base_model = AutoModelForCausalLM.from_pretrained(model_name)
merged_model = PeftModel.from_pretrained(base_model, "./llama4-scout-coder-lora")
merged_model = merged_model.merge_and_unload()
merged_model.save_pretrained("./llama4-scout-coder-merged")
\`\`\`

---

## Fine-Tuning Mistral Large 2

Mistral Large 2 uses a different architecture. Here is the optimized config:

\`\`\`python
mistral_lora_config = LoraConfig(
    r=32,  # Higher rank for Mistral
    lora_alpha=64,
    target_modules=[
        "q_proj", "k_proj", "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj"
    ],
    lora_dropout=0.1,
)

# Mistral requires padding_side="left" for generation
tokenizer.padding_side = "left"
\`\`\`

---

## Dataset Best Practices

### Quality over Quantity

| Examples | Quality | Expected Lift |
|---|---|---|
| 100 | Low | 3-5% |
| 500 | Medium | 8-12% |
| 2000 | High | 12-18% |
| 10000 | Very High | 15-25% |

### Data Quality Checklist

- [ ] Each example has clear instruction + expected output
- [ ] Examples cover edge cases (not just happy path)
- [ ] No conflicting examples (same input, different output)
- [ ] Balanced distribution across categories
- [ ] Validation set (10-20% of total)

---

## Hardware Requirements

| Model | Method | Min VRAM | Recommended GPU |
|---|---|---|---|
| Llama 4 Scout (109B) | QLoRA | 24 GB | RTX 4090 |
| Llama 4 Maverick (200B) | QLoRA | 48 GB | 2x RTX 4090 |
| Mistral Large 2 (123B) | QLoRA | 48 GB | 2x RTX 4090 |
| Phi-4 (14B) | LoRA | 12 GB | RTX 3060 |
| Gemma 3-27B | QLoRA | 24 GB | RTX 4090 |

---

## Evaluation

\`\`\`python
from lm_eval import evaluator

results = evaluator.simple_evaluate(
    model="local",
    model_args=f"pretrained=./llama4-scout-coder-merged",
    tasks=["mmlu", "human_eval", "gsm8k"],
    batch_size=4,
)

print(f"MMLU: {results['results']['mmlu']['acc']}")
print(f"HumanEval: {results['results']['human_eval']['pass@1']}")
\`\`\`

---

## The Bottom Line

Fine-tuning in 2026 is accessible to anyone with a gaming GPU. Using QLoRA + Unsloth, you can fine-tune Llama 4 Scout on an RTX 4090 in 3-6 hours. The key is high-quality data and the right hyperparameters. Start small (500 examples, rank 16), evaluate thoroughly, and iterate. DoRA is the emerging best practice — it matches full fine-tuning quality at QLoRA-level memory costs.
  `,
  coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  date: "2026-05-27",
  readingTime: "14 min read",
  category: "Tutorial",
  tags: ["Fine-Tuning", "LoRA", "QLoRA", "Llama 4", "Mistral"],
  author: AUTHOR_VASUDEV
};
