const fs = require("fs");
const homedir = require("os").homedir();
var HTTPSnippet = require('httpsnippet');


module.exports.workspaceActions = [
    {
        label: "generate swift code",
        icon: "fa-apple",
        action: async (context, models) => {
            const ex = await context.data.export.har({
                includePrivate: false,
                workspace: models.workspace
            });
            const parsed = JSON.parse(ex);

            //filter the entries with comment starting with CodeGen prefix
            const filteredEntries = parsed.log.entries.filter(
                d => d.comment.lastIndexOf("CodeGen-", 0) === 0
            );
            const username = homedir.split("/")[2];

            for (var i = 0; i < filteredEntries.length; i += 1) {
                parsed.log.entries = [filteredEntries[i]];

                //create the swift snippet
                var snippet = new HTTPSnippet(parsed)
                const code = snippet.convert('swift', 'custom')

                //save file to users desktop
                const filename = filteredEntries[i].comment.replace("CodeGen-", "")
                fs.writeFileSync(
                    `/users/${username}/Desktop/${filename}.swift`,
                    code
                )
            }
        }
    },
    {
        label: "generate kotlin code",
        icon: "fa-android",
        action: async (context, models) => {
            const ex = await context.data.export.har({
                includePrivate: false,
                workspace: models.workspace
            });
            const parsed = JSON.parse(ex);

            //filter the entries with comment starting with CodeGen prefix
            const filteredEntries = parsed.log.entries.filter(
                d => d.comment.lastIndexOf("CodeGen-", 0) === 0
            );
            const username = homedir.split("/")[2];

            for (var i = 0; i < filteredEntries.length; i += 1) {
                parsed.log.entries = [filteredEntries[i]];

                //create the swift snippet
                var snippet = new HTTPSnippet(parsed)
                const code = snippet.convert('kotlin', 'custom')

                //save file to users desktop
                const filename = filteredEntries[i].comment.replace("CodeGen-", "")
                fs.writeFileSync(
                    `/users/${username}/Desktop/${filename}.kt`,
                    code
                )
            }
        }
    }
];
