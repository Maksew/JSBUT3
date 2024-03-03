'use strict';

const nodemailer = require('nodemailer');
const { sendEmail } = require('../lib/services/mail');

jest.mock('nodemailer', () => ({
    createTransport: jest.fn(),
}));

describe('Mailer Service', () => {
    let transporterMock;

    beforeEach(() => {
        transporterMock = {
            sendMail: jest.fn().mockResolvedValue({ messageId: '123' }),
        };
        nodemailer.createTransport.mockReturnValue(transporterMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send email successfully', async () => {
        const to = 'test@example.com';
        const subject = 'Test Subject';
        const text = 'Test Message';

        const info = await sendEmail(to, subject, text);

        expect(nodemailer.createTransport).toHaveBeenCalled();
        expect(transporterMock.sendMail).toHaveBeenCalledWith({
            from: process.env.EMAIL_USERNAME,
            to: to,
            subject: subject,
            text: text,
        });
        expect(info).toEqual({ messageId: '123' });
    });

    it('should throw an error if sending email fails', async () => {
        const to = 'test@example.com';
        const subject = 'Test Subject';
        const text = 'Test Message';

        transporterMock.sendMail.mockRejectedValue(new Error('Failed to send email'));

        await expect(sendEmail(to, subject, text)).rejects.toThrowError('Failed to send email');
    });
});
