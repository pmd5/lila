
"use strict";

module.exports = {
    /**
     * network, do following works:
     *     1. how many machines
     *     2. whether use distributed servers
     *     3. how to ensure html/css inline reference
     *     ...
     */
    network: [
        {
            servers: [
                {
                    host: "xx.xx.xx.xx",
                    user: "user",
                    pass: "password",
                    remotePath: "remotePath"
                }
            ]
        }
        // ...
    ],
    /**
     * build options, do following works:
     *     1. whether minify html/css/js files
     *     2. whether split js file
     *     3. whether pack css into a single file
     *     ...
     */
    buildOptions: [
        {}
        // ...
    ],
    // extra directories to sync to remote, like images, fonts.
    directoriesToSync: {
        // format: key -> path
        images: "images", // images' directory, relative to basePaths.webRoot
        fonts: "fonts" // fonts' directory, relative to basePaths.webRoot
    }
};

