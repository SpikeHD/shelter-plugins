# Where is my plugin repo?

This plugin searches the `shelter-plugins` GitHub topic. If your repository does not have that topic set, you can <a href="https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics">set it in your repository's settings</a>.

# Why are my plugins not showing up/showing as unknown?

Since there is zero standardization as to how plugins are shared and deployed, this plugin makes some best-guesses:

* It looks for a homepage set in your repository's settings. If it finds one, it will use that as the plugin's homepage.
  * If it doesn't see one, it assumes a `<username>.github.io` URL, as that is most common.
* It then checks two URL structures for the plugin's repo:
  * `<url>/shelter-plugins/<plugin-name>`
  * `<url>/<plugin-name>`

If neither checks succeed, the plugin will be marked as unknown.

To fix this (for example, if you use a custom domain), just set the `homepage` field in your GitHub repo to where the `shelter-plugin`s live. For example, if you host your plugins at `https://myplugins.dev/files/shelter/<plugin>`, set the homepage to `https://myplugins.dev/files/shelter`.