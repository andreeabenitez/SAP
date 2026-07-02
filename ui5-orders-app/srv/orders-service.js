const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

    this.on('confirmOrder', async (req) => {
        const { orderId } = req.data;

        if (!orderId) return req.error(400, 'orderId es obligatorio');

        const order = await SELECT.one.from('orders.Orders').where({ id: orderId });

        if (!order) return req.error(404, `Orden ${orderId} no encontrada`);
        if (order.status === 'Delivered') return req.error(400, `Ya está confirmada`);
        if (order.status === 'Cancelled') return req.error(400, `No se puede confirmar una orden cancelada`);

        await UPDATE('orders.Orders').set({ status: 'Delivered' }).where({ id: orderId });

        return await SELECT.one.from('orders.Orders').where({ id: orderId });
    });

});