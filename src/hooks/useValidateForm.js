import Swal from "sweetalert2";
import {
    email,
    length,
    maxValue,
    minLength,
    minValue,
    nonEmpty,
    object,
    parse,
    pipe,
    regex,
    string,
    ValiError,
} from "valibot";

export const useValidateform = (data = {}, form = "", extra = null) => {
    try {
        let schema;

        switch (form) {
            case "login-form":
                schema = object({
                    user_email: pipe(
                        nonEmpty("Debes ingresar un email"),
                        string("El email debe ser una cadena de texto"),
                        email("El email no es valido")
                    ),
                    user_password: pipe(
                        nonEmpty("Debes ingresar una contraseña"),
                        string("La contraseña debe ser una cadena de texto"),
                        minLength(
                            6,
                            "La contraseña debe tener al menos 6 caracteres"
                        )
                    ),
                });
                break;
            case "register-form":
                break;
            default:
                return {
                    success: false,
                    message: "Formulario no encontrado",
                    data: null,
                };
                break;
        }

        // Remove previous errors
        document.querySelectorAll(`.input-error`).forEach((input) => {
            input
                .closest(".form-control")
                .querySelectorAll(".label-error")
                .forEach((element) => element.remove());
            input.classList.remove("input-error");
            input.classList.remove("focus:input-error");
            input.classList.remove("select-error");
            input.classList.remove("focus:select-error");
            input.classList.remove("textarea-error");
            input.classList.remove("focus:textarea-error");
        });

        const finalData = parse(schema, data);
        if (
            form === "reset-password-form" &&
            data.usuario_contra !== data.usuario_contra_confirm
        ) {
            if (data.usuario_contra !== data.usuario_contra_confirm) {
                throw new ValiError([
                    {
                        path: [{ key: "usuario_contra" }],
                        message: "Las contraseñas no coinciden",
                    },
                    {
                        path: [{ key: "usuario_contra_confirm" }],
                        message: "Las contraseñas no coinciden",
                    },
                ]);
            }
        }

        return { success: true, message: "Formulario valido", data: finalData };
    } catch (error) {
        let fieldErrors = [];

        error.issues.forEach((issue) => {
            fieldErrors.push({
                field: issue.path[0].key,
                message: issue.message,
            });

            document
                .querySelectorAll(`[name="${issue.path[0].key}"]`)
                .forEach((input) => {
                    input.classList.add("input-error");
                    input.classList.add("focus:input-error");
                    input.classList.add("select-error");
                    input.classList.add("focus:select-error");
                    input.classList.add("textarea-error");
                    input.classList.add("focus:textarea-error");

                    const errorLabel = document.createElement("label");
                    errorLabel.className = "label-error text-red-500";
                    errorLabel.textContent = issue.message;
                    input.closest(".form-control").appendChild(errorLabel);
                });
        });

        return {
            success: false,
            message: "Formulario no valido",
            errors: fieldErrors,
        };
    }
};
