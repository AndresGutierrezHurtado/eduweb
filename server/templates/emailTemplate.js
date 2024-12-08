export const resetPasswordTemplate = (token, name) => `
<html>
<body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px 10px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #add8e6; color: #ffffff; text-align: center; padding: 20px;">
            <h1 style="margin: 0; font-size: 24px;">Petición de cambio de contraseña</h1>
        </div>
        <div style="padding: 20px; color: #333333;">
            <p style="line-height: 1.6; margin: 0 0 20px;">Hola ${name},</p>
            <p style="line-height: 1.6; margin: 0 0 20px;">Recibimos una petición para cambiar tu contraseña. Si tú no hiciste esta petición, por favor ignora este email. De lo contrario puedes cambiar tu contraseña utilizando el siguiente link:</p>
            <a href="${process.env.VITE_CLIENT_URL}/reset/${token}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #add8e6; color: #ffffff; text-decoration: none; border-radius: 5px;">Cambiar contraseña</a>
            <p style="line-height: 1.6; margin: 0 0 20px;">Si tienes preguntas o dudas, no dudes en contactarnos.</p>
            <p style="line-height: 1.6; margin: 0;">Atentamente,<br>Eduweb</p>
        </div>
        <div style="background-color: #f4f4f4; text-align: center; padding: 10px; font-size: 12px; color: #777777;">
            <p style="margin: 0;">&copy; Eduweb.</p>
        </div>
    </div>
</body>
</html>
`;

export const passwordChangedTemplate = (name) => `
<html>
<body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px 10px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #add8e6; color: #ffffff; text-align: center; padding: 20px;">
            <h1 style="margin: 0; font-size: 24px;">Información de cambio de contraseña</h1>
        </div>
        <div style="padding: 20px; color: #333333;">
            <p style="line-height: 1.6; margin: 0 0 20px;">Hola ${name},</p>
            <p style="line-height: 1.6; margin: 0 0 20px;">Recibimos una alerta de cambio de contraseña. Si tú no hiciste esta alerta, por favor ignora este email.</p>
            <p style="line-height: 1.6; margin: 0 0 20px;">Si tienes preguntas o dudas, no dudes en contactarnos.</p>
            <p style="line-height: 1.6; margin: 0;">Atentamente,<br>Eduweb</p>
        </div>
        <div style="background-color: #f4f4f4; text-align: center; padding: 10px; font-size: 12px; color: #777777;">
            <p style="margin: 0;">&copy; Eduweb.</p>
        </div>
    </div>
</body>
</html>
`;

