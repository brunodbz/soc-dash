#!/usr/bin/env bash
# Instala dependências necessárias para executar o Docker Compose do projeto SOC Dashboard
# Compatível com distribuições baseadas em Debian/Ubuntu

set -euo pipefail

if ! command -v sudo >/dev/null 2>&1; then
  echo "Este script requer sudo para instalar pacotes."
  exit 1
fi

install_docker() {
  echo "Instalando Docker Engine, Docker Compose plugin e utilitários..."

  sudo apt-get update
  sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    wget

  if [ ! -d /etc/apt/keyrings ]; then
    sudo mkdir -p /etc/apt/keyrings
  fi

  if [ ! -f /etc/apt/keyrings/docker.gpg ]; then
    curl -fsSL https://download.docker.com/linux/$(. /etc/os-release && echo "$ID")/gpg | \
      sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  fi

  source /etc/os-release
  echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/${ID} \
$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

  sudo apt-get update
  sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

  echo "Docker e Docker Compose instalados com sucesso."
}

needs_install() {
  if ! command -v docker >/dev/null 2>&1; then
    return 0
  fi

  if ! docker compose version >/dev/null 2>&1; then
    return 0
  fi

  return 1
}

if needs_install; then
  install_docker
else
  echo "Docker e Docker Compose já estão instalados. Nenhuma ação necessária."
fi

if ! getent group docker >/dev/null 2>&1; then
  echo "Criando grupo docker..."
  sudo groupadd docker
fi

if ! id -nG "$USER" | tr ' ' '\n' | grep -qx docker; then
  echo "Adicionando o usuário atual ao grupo docker..."
  sudo usermod -aG docker "$USER"
  echo "Para aplicar a mudança, faça logout/login ou execute 'newgrp docker'."
fi

cat <<'MSG'
Pré-requisitos verificados.
Agora você pode executar:
  docker compose version
  docker compose up -d
MSG
