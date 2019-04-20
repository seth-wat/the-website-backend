const mockSendEmail = jest.fn().mockImplementation(() => ({
    promise: () => Promise.resolve('mockData')
}))

jest.mock('aws-sdk', () => ({
    SES: class {
        constructor() {
            this.sendEmail = mockSendEmail
        }
    }
}))

const mockGenerateEmail = jest.fn().mockReturnValue('mockEmail')
const mockGenerateError = jest.fn().mockReturnValue('mockError')
const mockGenerateResponse = jest.fn().mockReturnValue('mockResponse')

jest.mock(('./helpers'), () => ({

    generateEmail: mockGenerateEmail,
    generateError: mockGenerateError,
    generateResponse: mockGenerateResponse

}))

describe("when calling send", () => {

    const {send} = require('./index')

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("and no error occurred", () => {

        test("that generateEmail is called with the event body", async () => {
            const mockBody = '{"any": "json"}'
            await send({body: mockBody})
            const expectedInput = JSON.parse(mockBody)
            expect(mockGenerateEmail).toHaveBeenCalledWith(expectedInput)
        })

        test("that SES.sendEmail is called with the result of generateEmail", async () => {
            await send({body: '{"any": "json"}'})
            expect(mockSendEmail).toHaveBeenCalledWith('mockEmail')
        })

        test("that generateResponse is called with status code 200 and the result SES.sendEmail", async () => {
            await send({body: '{"any": "json"}'})
            expect(mockGenerateResponse).toHaveBeenCalledWith(200, 'mockData')
        })

        test("that send returns the result of generateResponse", async () => {
            const result = await send({body: '{"any": "json"}'})
            expect(result).toEqual('mockResponse')
        })

    })

    describe("and an error occurred", () => {

        test("that generateError is called with status code 500 and the error", async () => {
            const expectedError = new SyntaxError('Unexpected token i in JSON at position 0')
            await send({body: 'invalid json will throw syntax error'})
            expect(mockGenerateError).toHaveBeenCalledWith(500, expectedError)
        })

        test("that send returns the result of generateError", async () => {
            const result = await send({body: 'invalid json will throw syntax error'})
            expect(result).toEqual('mockError')
        })

    })
})
