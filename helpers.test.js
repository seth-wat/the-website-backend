

const setup = (mockEmail) => {
    process.env.EMAIL = mockEmail
    return require('./helpers')
}

// return {
//     Source: EMAIL,
//     Destination: { ToAddresses: [EMAIL] },
//     ReplyToAddresses: [EMAIL],
//     Message: {
//         Body: {
//             Text: {
//                 Charset: 'UTF-8',
//                 Data: `Message sent from email ${email} by ${name} \n ${content}`
//             }
//         },
//         Subject: {
//             Charset: 'UTF-8',
//             Data: `You received a message from your personal website!`
//         }
//     }
// }

describe("generateEmail", () => {
    describe("on the generated object", () => {

        const mockEmail = 'anyEmailString'
        const {generateEmail} = setup(mockEmail)

        test("that Source is equal to the EMAIL in env", () => {

            const email = generateEmail({name: 'any', 'email': 'any', content: 'any'})
            expect(email.Source).toEqual(mockEmail)

        })

        test("that ToAddresses contains the EMAIL in env as the first index", () => {
            const email = generateEmail({name: 'any', 'email': 'any', content: 'any'})
            expect(email.Destination.ToAddresses).toEqual([mockEmail])
        })

        test("that the Body charset is UTF-8", () => {
            const email = generateEmail({name: 'any', 'email': 'any', content: 'any'})
            expect(email.Message.Body.Text.Charset).toEqual('UTF-8')
        })

        test("that the Body Data contains the input name, email, and content correctly formatted", () => {
            const mockName = 'someName'
            const mockEmail = 'someEmail'
            const mockContent = 'someContent'
            const email = generateEmail({name: mockName, email: mockEmail, content: mockContent})
            const expectedData = `Message sent from email ${mockEmail} by ${mockName} \n ${mockContent}`
            expect(email.Message.Body.Text.Data).toEqual(expectedData)
        })

        test("that the Subject charset is UTF-8", () => {
            const email = generateEmail({name: 'any', 'email': 'any', content: 'any'})
            expect(email.Message.Subject.Charset).toEqual('UTF-8')
        })

        test("that the Subject Data contains the correct message", () => {
            const email = generateEmail({name: 'any', 'email': 'any', content: 'any'})
            expect(email.Message.Subject.Data).toEqual('You received a message from your personal website!')
        })
    })
})