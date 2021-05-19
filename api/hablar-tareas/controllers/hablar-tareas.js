const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            data.user = ctx.state.user.id;
            entity = await strapi.services['hablar-tareas'].create(data, { files });
        } else {
            ctx.request.body.user = ctx.state.user.id;
            entity = await strapi.services['hablar-tareas'].create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models['hablar-tareas'] });
    },
};
