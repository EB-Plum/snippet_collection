"""Run with Python 3: python retry.py"""

requests = {}


def apply_exchange(key, order):
    if key in requests:
        original_order, receipt = requests[key]
        if original_order != order:
            raise ValueError("같은 키에 서로 다른 주문")
        return receipt

    receipt = len(requests) + 1
    requests[key] = (order, receipt)
    return receipt


if __name__ == "__main__":
    apply_exchange("intent-1", "A17")  # 서버 저장 후 첫 응답이 유실됐다고 가정
    receipt = apply_exchange("intent-1", "A17")
    assert receipt == 1 and len(requests) == 1
    try:
        apply_exchange("intent-1", "B24")
    except ValueError:
        assert len(requests) == 1
    else:
        raise AssertionError("충돌을 감지하지 못함")
    print("재시도 후 신청 1건, 다른 주문의 키 재사용 거절")
