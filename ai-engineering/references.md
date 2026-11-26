# 원문과 근거 범위

| 원문 | 이 자료에서 사용한 내용 |
| --- | --- |
| [Anthropic · Building effective agents](https://www.anthropic.com/research/building-effective-agents) | 워크플로와 에이전트의 구분, 다섯 가지 조합 패턴, 도구 인터페이스 |
| [Anthropic · Effective context engineering for AI agents](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents) | 필요한 시점의 정보 조회, 요약과 장기 작업 메모 |
| [Anthropic · Demystifying evals for AI agents](https://www.anthropic.com/research/demystifying-evals-for-ai-agents) | 실행 기록과 최종 결과의 구별, 여러 번의 시행을 통한 평가 |
| [AWS Builders’ Library · Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) | 요청 ID로 의도 식별, 중복 처리와 입력 불일치 |

주문 문의, 흐름도와 Python 예제는 위 원리를 설명하기 위해 만든 사례다. 실험은 같은 프로세스에서 순차 호출한 결과만 보여 준다. 실제 모델의 정확도나 서비스 성능을 측정한 자료는 없다.
