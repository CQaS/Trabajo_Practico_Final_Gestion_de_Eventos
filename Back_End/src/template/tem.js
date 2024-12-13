export const plantilla = (data) => {

    const {
        nombreCompleto,
        nombreEvento,
        fechaEvento,
        lugarEvento,
        fechaEmision
    } = data

    return `<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Certificado de Asistencia</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            width: 80%;
            margin: 50px auto;
            padding: 30px;
            background-color: white;
            border: 2px solid #333;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        h1 {
            font-size: 36px;
            margin-bottom: 10px;
        }

        h2 {
            font-size: 24px;
            margin: 5px 0;
            color: #555;
        }

        .event-info {
            margin: 20px 0;
        }

        p {
            font-size: 18px;
            line-height: 1.6;
        }

        .signature {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
        }

        .signature div {
            width: 40%;
            border-top: 1px solid #333;
            text-align: center;
            padding-top: 10px;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Certificado de Asistencia</h1>
        <p>Otorgado a:</p>
        <h2>${nombreCompleto}</h2>
        <p>Por su participación en el evento:</p>
        <h2>${nombreEvento}</h2>

        <div class="event-info">
            <p>
                El evento tuvo lugar el día <strong>${fechaEvento}</strong> en
                <strong>${lugarEvento}</strong>.
            </p>
            <p>
                Agradecemos su asistencia y participación activa.
            </p>
        </div>

        <div class="signature">
            <div>Firma del Organizador</div>
            <div>Fecha de Emisión: ${fechaEmision}</div>
        </div>
    </div>
</body>

</html>`
}