<!-- ...existing code... -->
# ivandon15.github.io — Personal Homepage

Short Description:
This is my personal homepage, built with Jekyll and the Chirpy theme. Content is placed in the _posts, pages, and assets directories, and generated static files are located in _site (this directory should not be pushed).

Quick Run (Local Debugging):
1. Install Ruby and Bundler (RubyInstaller is recommended for Windows). 2. In the repository root directory, run:
```bash
bundle install
bundle exec jekyll serve
```
3. Open your browser to http://localhost:4000

Common locations:
- Posts: _posts/
- Author information: _data/authors.yml (the author field is the author ID; this file will be used)
- Site configuration: _config.yml
- Theme assets and styles: assets/
- GitHub Action CI: .github/workflows/pages-deploy.yml

Template:
- Uses the Chirpy theme (jekyll-theme-chirpy). The theme configuration and some local override files are retained for customization.

License:
MIT

# Chirpy Starter

[![Gem Version](https://img.shields.io/gem/v/jekyll-theme-chirpy)][gem]&nbsp;
[![GitHub license](https://img.shields.io/github/license/cotes2020/chirpy-starter.svg?color=blue)][mit]

When installing the [**Chirpy**][chirpy] theme through [RubyGems.org][gem], Jekyll can only read files in the folders
`_data`, `_layouts`, `_includes`, `_sass` and `assets`, as well as a small part of options of the `_config.yml` file
from the theme's gem. If you have ever installed this theme gem, you can use the command
`bundle info --path jekyll-theme-chirpy` to locate these files.

The Jekyll team claims that this is to leave the ball in the user’s court, but this also results in users not being
able to enjoy the out-of-the-box experience when using feature-rich themes.

To fully use all the features of **Chirpy**, you need to copy the other critical files from the theme's gem to your
Jekyll site. The following is a list of targets:

```shell
.
├── _config.yml
├── _plugins
├── _tabs
└── index.html
```

To save you time, and also in case you lose some files while copying, we extract those files/configurations of the
latest version of the **Chirpy** theme and the [CD][CD] workflow to here, so that you can start writing in minutes.

## Usage

Check out the [theme's docs](https://github.com/cotes2020/jekyll-theme-chirpy/wiki).

## Contributing

This repository is automatically updated with new releases from the theme repository. If you encounter any issues or want to contribute to its improvement, please visit the [theme repository][chirpy] to provide feedback.

## License

This work is published under [MIT][mit] License.

[gem]: https://rubygems.org/gems/jekyll-theme-chirpy
[chirpy]: https://github.com/cotes2020/jekyll-theme-chirpy/
[CD]: https://en.wikipedia.org/wiki/Continuous_deployment
[mit]: https://github.com/cotes2020/chirpy-starter/blob/master/LICENSE
