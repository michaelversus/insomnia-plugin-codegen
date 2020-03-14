const fs = require("fs");
const homedir = require("os").homedir();
var HTTPSnippet = require('httpsnippet');


module.exports.workspaceActions = [
    {
        label: "My Plugin Action",
        icon: "fa-star",
        action: async (context, models) => {
            //const filtered = models.requestGroups.filter(d => d.name == "CodeGen");
            const ex = await context.data.export.har({
                includePrivate: false,
                workspace: models.workspace
            });
            const parsed = JSON.parse(ex);
            const filteredEntries = parsed.log.entries.filter(
                d => d.comment.lastIndexOf("CodeGen", 0) === 0
            );
            parsed.log.entries = filteredEntries;
            //results.push(`<li>${models.workspace}</li>`);
            //const html = `<ul>${results.join("\n")}</ul>`;
            //context.app.showGenericModalDialog("Results", { html });
            const username = homedir.split("/")[2];
            const har = JSON.stringify(parsed)
            var snippet = new HTTPSnippet(har)
            const code = snippet.convert('swift', 'nsurlsession')

            fs.writeFileSync(
                `/users/${username}/Desktop/Export.swift`,
                code
            )
        }
    }
];