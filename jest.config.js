const config = {
  verbose: true, //실행 중에 각 개별 테스트를 보고해야 하는지 여부
  rootDir: '/Users/taeheekim/Desktop/hooks-movie-app-with-TS',
  //Jest가 테스트와 모듈을 스캔해야 하는 루트 디렉터리
  testEnvironment: 'jsdom',
  //테스트에 사용할 테스트 환경
  transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$'],
  // 파일 경로 가 패턴 과 일치 하면 변환되지 않습니다.
  coveragePathIgnorePatterns: ['src/components/index.ts'],
  // 파일 경로가 패턴 중 하나와 일치하면 적용 범위 정보를 건너뜁
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/fileMock.js',
    '\\.(css|less)$': '<rootDir>/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

module.exports = config;
