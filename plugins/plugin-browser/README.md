# Where is my plugin repo?

This plugin searches the term `shelter-plugins` on GitHub. That's it! If your repository doesn't show up, make sure to include "shelter plugins" somewhere in your repo's description or name.

# Why are my plugins not showing up/showing as uninstallable?

Since there is zero standardization as to how plugins are shared and deployed, this plugin makes some best-guesses:

* It looks for a homepage set in your repository's settings. If it finds one, it will use that as the plugin's homepage.
  * If it doesn't see one, it assumes a `<username>.github.io` URL, as that is most common.
* It then checks two URL structures for the plugin's repo:
  * `<url>/shelter-plugins/<plugin-name>`
  * `<url>/<plugin-name>`

If neither checks succeed, the plugin will be marked as uninstallable, as it doesn't know where to source it.

To fix this (for example, if you use a custom domain), just set the `homepage` field in your GitHub repo to where the `shelter-plugin`s live. For example, if you host your plugins at `https://myplugins.dev/files/shelter/<plugin>`, set the homepage to `https://myplugins.dev/files/shelter`.