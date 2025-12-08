import os
import requests

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://ollama:11434")
MODEL_NAME = os.getenv("OLLAMA_MODEL", "llama3")

def analyze_financial_data(data: dict) -> str:
    prompt = prompt = f"""
      Você é um consultor financeiro especializado.

      Analise os seguintes dados:

      {data}

      Produza uma resposta clara e objetiva contendo:

      1. Resumo da Situação Financeira
      2. Principais Riscos (endividamento, gastos, fluxo de caixa)
      3. Recomendações Práticas (curto e médio prazo)
      4. Estratégias de Investimento baseadas no perfil - Indicando a % ideal da carteira.
      5. Observações Finais

      Use no máximo 12 linhas por seção.
      ATENÇÃO: O bruto total que deve ser considerado é "salary " + "entries" (Salário + Entradas) - "expenses" (Saídas). Indique também se o usuário passou do seu limite de gastos (limit)
      """

    try:
        response = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model": MODEL_NAME,
                "prompt": prompt,
                "stream": False
            },
            timeout=200
        )

        response.raise_for_status()

        result = response.json()

        return result.get("response", "Nenhuma resposta gerada pelo modelo.")

    except Exception as e:
        return f"[ERRO AO ACESSAR A IA] Não foi possível gerar análise financeira."