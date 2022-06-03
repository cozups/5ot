function adminRequired(req, res, next) {
  // 해당 token 이 정상적인 token인지 확인
  try {
    const role = jwtDecoded.role;
    
    if (role !== 'admin') {
      res.status(403).json({
      result: 'forbidden-approach',
      reason: '관리자만 접근 가능합니다..',
      });
    } else {
      next();
    }
  } catch (error) {
    // jwt.verify 함수가 에러를 발생시키는 경우는 토큰이 정상적으로 decode 안되었을 경우임.
    // 403 코드로 JSON 형태로 프론트에 전달함.
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '정상적인 토큰이 아닙니다.ADMIN',
    });

    return;
  }
}

export { adminRequired };






