import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => {
    return {
        bail: 1,
        clearMocks: true,
        collectCoverage: true,
        collectCoverageFrom: [
            './src/helpers/*.ts',
            // add other to collect coverage
        ],
        coverageReporters: ['lcov'],
        detectOpenHandles: true,
        forceExit: true,
        testEnvironment: 'node',
        testMatch: ['**/*.test.ts'],
        transform: {
            '^.+\\.ts?$': [
                'ts-jest',
                {
                    tsconfig: {
                        importHelpers: true,
                    },
                },
            ],
        },
        verbose: true,
    }
}
