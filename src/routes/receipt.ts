import express from 'express';
import connectionDB from '../database';
import { Request, Response, Router } from 'express';
import PDF from 'pdfkit';
const router = express.Router();

router.get('/:id', (req : any, res : any) => {
    connectionDB.query("SELECT register.start_date, register.end_date, routes.description, zone.name AS name_z, drivers.name AS name_d, drivers.lastname AS lastname_d, drivers.photo AS photo_d, drivers.phone AS phone_d, vehicle.registration, vehicle.color, vehicle.model, vehicle.brand FROM register,  routes,  zone, drivers, vehicle, customer WHERE register.customer_id=$1  AND customer.id_customer=$1 and register.routes_id=routes.id_routes AND routes.driver_id=drivers.id_driver AND vehicle.driver_id=drivers.id_driver AND routes.zone_id=zone.id_zone", [req.params.id], (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows[0]);
        console.log("datos del servicio");
    });
});

//Pdf
router.get('/download/:id', async (req: Request, res: Response) => {
    try {
        const data = await connectionDB.query(
            "SELECT register.start_date, register.end_date, routes.description, zone.name AS name_z, drivers.name AS name_d, drivers.lastname AS lastname_d, drivers.photo AS photo_d, drivers.phone AS phone_d, vehicle.registration, vehicle.color, vehicle.model, vehicle.brand FROM register,  routes,  zone, drivers, vehicle, customer WHERE register.customer_id=$1  AND customer.id_customer=$1 and register.routes_id=routes.id_routes AND routes.driver_id=drivers.id_driver AND vehicle.driver_id=drivers.id_driver AND routes.zone_id=zone.id_zone",
            [req.params.id]
        );
        const row = data.rows[0];

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=recibo.pdf');

        const doc = new PDF();
        doc.pipe(res);
        doc.fontSize(30).fillColor('red').text(`Recibo`,{align: 'center'});
        doc.moveTo(50,100).lineTo(doc.page.width-50,100).stroke();
        doc.fontSize(5).text(" ");
        doc.fontSize(17).fillColor('red').text(`Información del servicio:`);
        doc.fontSize(2).text(" ");
        doc.fontSize(11).fillColor('black').text(`Fecha de inicio: ${row.start_date}`);
        doc.fontSize(2).text(" ");
        doc.fontSize(11).fillColor('black').text(`Fecha de finalización: ${row.end_date}`);
        doc.fontSize(2).text(" ");
        doc.fontSize(11).fillColor('black').text(`Zona: ${row.name_z}`);
        doc.fontSize(2).text(" ");
        doc.fontSize(11).fillColor('black').text(`Descripción: ${row.description}`);
        doc.fontSize(2).text(" ");
        doc.fontSize(11).fillColor('black').text(`Precio: ${row.price}`);
        doc.fontSize(5).text(" ");
        doc.fontSize(17).fillColor('red').text(`Información del conductor y vehículo:`);
        doc.fontSize(2).text(" ");
        doc.fontSize(11).fillColor('black').text(`Nombre: ${row.name_d}`);
        doc.fontSize(2).text(" ");
        doc.fontSize(11).fillColor('black').text(`Apellido: ${row.lastname_d}`);
        doc.fontSize(2).text(" ");
        doc.fontSize(11).fillColor('black').text(`Número de teléfono: ${row.phone_d}`);
        doc.fontSize(2).text(" ");
        doc.fontSize(11).fillColor('black').text(`Número de placa: ${row.registration}`);
        doc.fontSize(2).text(" ");
        doc.fontSize(11).fillColor('black').text(`Marca: ${row.brand}`);
        doc.fontSize(2).text(" ");
        doc.fontSize(11).fillColor('black').text(`Modelo: ${row.model}`);
        doc.fontSize(2).text(" ");
        doc.fontSize(11).fillColor('black').text(`Color: ${row.color}`);
        doc.end();
    } catch (error) {
        console.error('Error al obtener datos de la base de datos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

export default router;