# 📊 Plataforma Inteligente para Recomendação de Estratégias Financeiras e Alocação de Ativos

![Python](https://img.shields.io/badge/Python-3.11-blue)
![Django](https://img.shields.io/badge/Django-5.x-success)
![DRF](https://img.shields.io/badge/Django_REST_Framework-API-red)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Docker](https://img.shields.io/badge/Docker-Compose-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![AI](https://img.shields.io/badge/AI-LLM-purple)

Este projeto consiste em uma **plataforma web inteligente para gestão financeira pessoal**, desenvolvida como **Trabalho de Conclusão de Curso (TCC)**.  
A aplicação permite que usuários registrem e acompanhem suas finanças pessoais e recebam **análises e recomendações financeiras personalizadas utilizando Inteligência Artificial**.

---

## 🧠 Funcionalidades Principais

- Cadastro e autenticação de usuários (JWT)
- Gerenciamento de:
  - Perfil de investidor (conservador, moderado ou agressivo)
  - Informações financeiras gerais (salário e limite de gastos)
  - Categorias de gastos com orçamento
  - Transações financeiras (entradas e saídas)
  - Dívidas
  - Metas financeiras
- Dashboard financeiro com:
  - Resumo mensal de receitas, despesas e saldo
  - Análise de gastos por categoria
- Análise inteligente da situação financeira
- Recomendações financeiras personalizadas baseadas no perfil do usuário

---

## 🏗️ Arquitetura do Projeto

O sistema é dividido em três principais camadas:

- **Backend**: Django + Django REST Framework  
- **Frontend**: Next.js (React)  
- **Banco de Dados**: PostgreSQL  
- **Inteligência Artificial**: Serviço externo via Ollama (LLM), integrado ao backend

Toda a aplicação é orquestrada utilizando **Docker e Docker Compose**, garantindo padronização do ambiente.

---

## 🧰 Tecnologias Utilizadas

### Backend
- Python
- Django
- Django REST Framework
- JWT
- PostgreSQL

### Frontend
- Next.js
- React
- JavaScript
- TailwindCSS 

### Infraestrutura
- Docker
- Docker Compose

### Inteligência Artificial
- Ollama
- Modelos LLM 

---

## 🚀 Como Rodar o Projeto Localmente

### 🔧 Pré-requisitos

Certifique-se de ter instalado:
- Docker
- Docker Compose

### ▶️ Passo a passo


1. **Clone o repositório**

git clone https://github.com/dev-cerb/finanflux

2. **Suba os containers**

docker compose up --build 

3. **Execute as migrations**

docker compose exec backend python manage.py migrate

---

## 🌐 Acesso à Aplicação

- **Frontend:** http://localhost:3000  
- **Backend (API):** http://localhost:8000/api/v1/  
- **Admin Django:** http://localhost:8000/admin/
- 
---

## 👨‍💻 Autor

**Carlos Barreto**  
Estudante de Ciência da Computação e Desenvolvedor Full Stack  

GitHub: https://github.com/dev-cerb
