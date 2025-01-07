function findScrollParent(node) {
  if (node == null) {
    return null;
  }

  if (node.scrollHeight > node.clientHeight) {
    return node;
  } else {
    if (node.parentNode) {
      return findScrollParent(node.parentNode);
    } else {
      return node;
    }
  }
}

function calcTargetScrollTopPosition(targetElem, scrollElem, offsetTop = 0, offsetBottom = 0) {
  // sticky나 fixed 등을 고려하면 약간 offset을 줘야 할 수 있음
  // 정확하게 보이는 여부 판단하려면 더 복잡해 질거 같은데, 일단은 단순하게 생각했음.

  const targetRect = targetElem.getBoundingClientRect()
  const scrollRect = scrollElem.getBoundingClientRect()
  const scrollHeight = scrollElem.clientHeight
  const currentScrollPos = scrollElem.scrollTop
  const elemHeight = targetRect.height

  // 일부 코드 중복에도 불구하고 세분화한 이유: 각 상황에 따라 다른 동작을 해야할 요구사항이 있을때를 대비 및 이해를 돕기 위함
  // BIG. 타겟이 스크롤 상자보다 큰 경우
  if (elemHeight > scrollHeight) {
    // OUT-ABOVE. 타겟이 스크롤 상자보다 완전히 위에 있는 경우
    if (targetRect.bottom <= scrollRect.top) {
      // 타겟의 위쪽이 스크롤 상자의 위쪽에 맞춰지게 하기
      return currentScrollPos - (scrollRect.top - targetRect.top) + offsetTop
    }
    // PARTIAL-UPPER. 타겟의 아래부분이 스크롤 상자 상단에 보이는 경우
    if (targetRect.bottom > scrollRect.top && targetRect.bottom < scrollRect.bottom) {
      // 타겟의 위쪽이 스크롤 상자의 위쪽에 맞춰지게 하기
      return currentScrollPos - (scrollRect.top - targetRect.top) + offsetTop
    }

    // IN-FULL. 스크롤 상자 안에 타겟이 완전히 보이는 경우
    if (targetRect.top <= scrollRect.top && targetRect.bottom >= scrollRect.bottom) {
      // 움직이지 않음
      return currentScrollPos
    }
    // PARTIAL-LOWER. 타겟의 윗부분이 스크롤 상자 하단에 보이는 경우
    if (targetRect.top > scrollRect.top && targetRect.top < scrollRect.bottom) {
      // 타겟의 위쪽이 스크롤 상자의 위쪽에 맞춰지게
      return currentScrollPos + (targetRect.top - scrollRect.top) + offsetTop
    }

    // OUT-UNDER. 타겟이 스크롤 상자보다 완전히 아래에 있는 경우
    if (targetRect.top > scrollRect.bottom) {
      // 타겟의 위쪽이 스크롤 상자의 위쪽에 맞춰지게
      return currentScrollPos + (targetRect.top - scrollRect.top) + offsetTop
    }
  }
  // SMALL. 타겟이 스크롤 상자보다 작은 경우
  else {
    // OUT-ABOVE. 타겟이 스크롤 상자보다 완전히 위에 있는 경우
    if (targetRect.bottom <= scrollRect.top) {
      // 타겟의 위쪽이 스크롤 상자의 위쪽에 맞춰지게
      return currentScrollPos - (scrollRect.top - targetRect.top) + offsetTop
    }
    // PARTIAL-UPPER. 타겟의 아래부분이 스크롤 상자 상단에 보이는 경우
    if (targetRect.bottom > scrollRect.top && targetRect.top < scrollRect.top) {
      // 타겟의 위쪽이 스크롤 상자의 위쪽에 맞춰지게
      return currentScrollPos - (scrollRect.top - targetRect.top) + offsetTop
    }
    // IN-FULL. 스크롤 상자 안에 타겟이 완전히 보이는 경우
    if (targetRect.top >= scrollRect.top && targetRect.bottom <= scrollRect.bottom) {
      return currentScrollPos
    }
    // PARTIAL-LOWER. 타겟의 윗부분이 스크롤 상자 하단에 보이는 경우
    if (targetRect.bottom > scrollRect.bottom && targetRect.top < scrollRect.bottom) {
      // 타겟의 아래쪽이 스크롤 상자의 아래에 맞춰지게
      return currentScrollPos + (targetRect.bottom - scrollRect.bottom) + offsetBottom
    }
    // OUT-UNDER. 타겟이 스크롤 상자보다 완전히 아래에 있는 경우
    if (targetRect.top >= scrollRect.bottom) {
      // 타겟의 아래쪽이 스크롤 상자의 아래에 맞춰지게
      return currentScrollPos + (targetRect.bottom - scrollRect.bottom) + offsetBottom
    }
  }
  console.warn("Unhandled case for target position calculation", targetRect, scrollRect)
  return currentScrollPos
}

function scrollIntoView(target, options = {
  jumpThreshold: 3000,
  scrollTimeout: 150,
  offsetTop: 0,
  offsetBottom: 0,
}) {
  return new Promise((resolve) => {
    const scrollElem = findScrollParent(target)
    if (!scrollElem) {
      resolve()
      return
    }

    const targetScrollPos = calcTargetScrollTopPosition(target, scrollElem, options.offsetTop, options.offsetBottom)
    const currentScrollPos = scrollElem.scrollTop
    const distance = Math.abs(targetScrollPos - currentScrollPos)

    if (distance > options.jumpThreshold) {
      //  긴 거리 스크롤시 중간 지점으로 먼저 이동
      if (targetScrollPos > currentScrollPos) {
        scrollElem.scrollTop = targetScrollPos - options.jumpThreshold
      } else {
        scrollElem.scrollTop = targetScrollPos + options.jumpThreshold
      }
    }

    requestAnimationFrame(() => {
      scrollElem.scrollTo({ top: targetScrollPos, behavior: "smooth" })
    })
    // 스크롤 완료 체크
    const checkScrollEnd = () => {
      const currentPos = scrollElem.scrollTop
      let lastPos = currentPos

      setTimeout(() => {
        // scroll 위치가 일정 범위내에 들어오면 멈춘걸로 판단
        if (Math.abs(scrollElem.scrollTop - lastPos) < 5) {
          resolve()
        } else {
          checkScrollEnd()
        }
      }, options.scrollTimeout)
    }

    checkScrollEnd()

  })
}


export { findScrollParent, scrollIntoView }
