# kjy1813.github.io

Personal portfolio site of Junyoung Kim, built with [Jekyll](https://jekyllrb.com/) and the [al-folio](https://github.com/alshedivat/al-folio) theme, hosted on GitHub Pages.

- Live site: https://kjy1813.github.io
- Projects: `_projects/` (one page per project, each linking to its repository)
- Repositories page: `_data/repositories.yml`
- Site settings: `_config.yml`, social links in `_data/socials.yml`

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to the `gh-pages` branch.

## License

Site content © Junyoung Kim. Theme code is MIT-licensed by the al-folio authors (see `LICENSE`).
