import { AUTHOR_VASUDEV } from "./author";

export const post = {
  id: "20",
  slug: "wsl2-ai-development",
  title: "How to Set Up WSL2 for AI Development on Windows",
  excerpt: "Transform your Windows machine into an AI development powerhouse with WSL2, CUDA, and local LLM tooling.",
  content: `
# How to Set Up WSL2 for AI Development on Windows

## Why WSL2 for AI Development

For years, Windows developers faced a harsh reality: most AI and machine learning tooling was built for Linux. PyTorch, TensorFlow, CUDA — the entire stack assumed a Unix environment. WSL2 changed everything. It runs a real Linux kernel inside Windows with near-native performance, giving you the best of both worlds: a Windows daily driver with a Linux AI workstation under the hood.

The killer feature is GPU passthrough. With NVIDIA's CUDA support inside WSL2, you can train models, run inference with local LLMs, and accelerate workloads using your GPU without dual-booting or sacrificing Windows applications. It just works.

## Installing WSL2

If you are on Windows 10 version 2004+ or Windows 11, installation is a single command. Open PowerShell as Administrator and run:

\`\`\`powershell
wsl --install
\`\`\`

This installs WSL2, the Linux kernel update, and sets Ubuntu as your default distribution. Restart your machine when prompted.

After reboot, verify the installation:

\`\`\`bash
wsl --version
wsl --list --verbose
\`\`\`

Ensure the version column shows 2. If you see version 1, upgrade it:

\`\`\`bash
wsl --set-version Ubuntu 2
wsl --set-default-version 2
\`\`\`

## Setting Up CUDA in WSL2

NVIDIA officially supports CUDA inside WSL2. Here is what you need:

1. **Windows GPU driver** — Install the latest NVIDIA Game Ready or Studio Driver for Windows (version 525.60.13 or later). Do NOT install Linux drivers inside WSL2; the Windows driver handles everything.
2. **CUDA Toolkit inside WSL2** — Ubuntu's package manager makes this straightforward.

Inside your WSL2 Ubuntu terminal:

\`\`\`bash
wget https://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt-get update
sudo apt-get install -y cuda-toolkit-12-4
\`\`\`

Verify CUDA is working:

\`\`\`bash
nvidia-smi
nvcc --version
\`\`\`

You should see your GPU listed along with the CUDA version. If \`nvidia-smi\` works, you have GPU acceleration ready to go.

### cuDNN Installation

For deep learning frameworks, install cuDNN:

\`\`\`bash
sudo apt-get install -y libcudnn9-cuda-12
\`\`\`

## Python ML Stack

Now install the Python machine learning stack. I recommend using \`pyenv\` or \`miniforge\` for environment management rather than the system Python.

### Install Miniforge (recommended for ARM compatibility)

\`\`\`bash
wget https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh
bash Miniforge3-Linux-x86_64.sh
\`\`\`

### Create a dedicated ML environment

\`\`\`bash
conda create -n ai python=3.11
conda activate ai
\`\`\`

### Install PyTorch with CUDA

\`\`\`bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124
\`\`\`

Test GPU access:

\`\`\`python
import torch
print(torch.cuda.is_available())
print(torch.cuda.get_device_name(0))
\`\`\`

### Install TensorFlow

\`\`\`bash
pip install tensorflow[and-cuda]
\`\`\`

Test it:

\`\`\`python
import tensorflow as tf
print(tf.config.list_physical_devices('GPU'))
\`\`\`

### Additional ML Libraries

\`\`\`bash
pip install transformers datasets accelerate scikit-learn matplotlib jupyter pandas numpy
\`\`\`

## Running Ollama in WSL2

Ollama makes running local LLMs trivial. Install it inside WSL2:

\`\`\`bash
curl -fsSL https://ollama.com/install.sh | sh
\`\`\`

Pull a few models to test:

\`\`\`bash
ollama pull llama3.2:3b
ollama pull phi4:14b
ollama pull mistral:7b
\`\`\`

Run a model interactively:

\`\`\`bash
ollama run llama3.2:3b
\`\`\`

### Exposing Ollama to Windows

By default, Ollama binds to localhost inside WSL2. To access it from Windows applications (including VS Code), set:

\`\`\`bash
ollama serve
\`\`\`

Then from Windows, configure your tools to use \`http://localhost:11434\`. WSL2 forwards the port automatically.

## Docker + NVIDIA Container Toolkit

Running AI workloads in containers keeps your host system clean and makes reproducibility easy.

### Install Docker

\`\`\`bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
\`\`\`

Log out and back in, then install the NVIDIA Container Toolkit:

\`\`\`bash
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
\`\`\`

Test GPU access inside a container:

\`\`\`bash
docker run --gpus all nvidia/cuda:12.4.0-base-ubuntu22.04 nvidia-smi
\`\`\`

Now you can run any AI container with GPU access:

\`\`\`bash
docker run --gpus all -p 8000:8000 --rm vllm/vllm-openai:latest --model mistralai/Mistral-7B-Instruct-v0.3
\`\`\`

## VS Code Remote Development

VS Code's Remote — WSL extension is the bridge between your Windows editor and the Linux AI environment.

1. Install the **Remote — WSL** extension in VS Code on Windows.
2. Open the command palette (Ctrl+Shift+P) and run \`Remote-WSL: New WSL Window\`.
3. VS Code reopens connected to WSL2. All terminals, extensions, and debugging run inside Linux.
4. Open your WSL2 project folder and start coding.

Your Windows VS Code settings sync automatically, but extensions run in the WSL context. Install Python, Jupyter, Pylance, and GitHub Copilot inside the remote window for the full AI development experience.

## File System Performance: /mnt vs \\\\\\\\wsl$

This is the most common performance pitfall. WSL2 provides two ways to access Windows files:

### /mnt/c/ (the slow path)

When you access Windows files through \`/mnt/c/Users/...\`, every read and write goes through the 9P protocol, which has significant overhead. For AI workloads involving large datasets this is devastatingly slow — expect 10-50x slower I/O compared to native Linux.

### \\\\\\\\wsl.localhost\\\\ (the fast path)

Store your projects, datasets, and model files inside the WSL2 filesystem (\`~/projects\`, \`~/data\`, etc.). Access them from Windows through \\\\\\\\wsl.localhost\\\\Ubuntu\\\\home\\\\yourname\\\\. This path uses the native ext4 filesystem with full performance.

**Rule of thumb:** Work inside WSL2's filesystem. Use \`/mnt/c\` only for transferring files.

## GPU Passthrough Benchmarks

NVIDIA's GPU passthrough in WSL2 is remarkably efficient. Independent benchmarks show:

- **Compute performance:** 95-99% of native Linux CUDA performance for matrix operations and training loops.
- **Memory bandwidth:** Near-native, within 2-5% of bare metal.
- **Inference latency:** Identical to native for batch sizes commonly used in LLM inference.
- **PCIe overhead:** Minimal — the GPU is assigned directly to the WSL2 VM through paravirtualization.

In practice, you will not notice a difference between training on WSL2 versus a native Linux install. The only exception is multi-GPU setups, where NVLink performance may have slight overhead.

## Common Issues and Fixes

### WSL2 running out of memory

By default, WSL2 can use up to 50% of your total RAM. For AI workloads, you need more. Create \`%UserProfile%/.wslconfig\`:

\`\`\`ini
[wsl2]
memory=32GB
processors=8
swap=8GB
localhostForwarding=true
\`\`\`

Restart WSL2: \`wsl --shutdown\` then launch again.

### CUDA out of memory errors

Monitor GPU memory usage with \`watch -n 1 nvidia-smi\`. If you run multiple models simultaneously, you may exhaust VRAM. Clear the cache:

\`\`\`bash
sudo fuser -v /dev/nvidia*
\`\`\`

Or simply restart the WSL2 instance.

### Network issues with VPNs

Some VPNs interfere with WSL2 networking. If you cannot access the internet inside WSL2, try disabling the VPN or configuring split tunneling to exclude WSL2 traffic.

### File permissions

When cloning repositories or moving files, you may encounter permission issues. Use \`chmod\` and \`chown\` inside WSL2 rather than trying to fix permissions from Windows.

### Docker daemon not starting

If Docker fails to start, ensure virtualization is enabled in BIOS and that Hyper-V is turned on in Windows Features:

\`\`\`powershell
dism.exe /online /enable-feature /featurename:Microsoft-Hyper-V /all /quiet
\`\`\`

## Conclusion

WSL2 has eliminated the last remaining reason to dual-boot for AI development. With GPU passthrough, native Linux performance, and seamless VS Code integration, you get a world-class AI development environment without leaving Windows. The setup takes about an hour, and the productivity gains are enormous.
  `,
  coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
  date: "2026-05-20",
  readingTime: "12 min read",
  category: "Developer Tools",
  tags: ["WSL2", "Windows", "AI", "Development Setup"],
  author: AUTHOR_VASUDEV
};
