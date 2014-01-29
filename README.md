# fundly-icon-font

A set of icons for use on Fundly.com. Primarily icons for our campaign categories but also for other things not covered in [FontAwesome](http://fontawesome.io/cheatsheet/).

This font can be viewed at: [fundly.github.io/fundly-icon-font/](http://fundly.github.io/fundly-icon-font/)

## Installation as a Gem

Add this line to your application's Gemfile:

    gem 'fundly-icon-font', git: 'git@github.com:fundly/fundly-icon-font.git'

And then execute:

    $ bundle


## Installation as a Bower package

Execute this in project root:

    $ bower install fundly-icon-font --save


## Usage

In a rails environment (with Sprockets)

    @import 'fundly-icon-font'

For a front end project (Yeoman, Grunt, Gulp etc), you can either include the compiled files from dist (minified or not) or use the SASS versions directly.

    <link rel="stylesheet" href="/dist/fundly-icon-font.css">

or

    @import "vendor/stylesheets/fundly-icon-font"


## Local Development

    $ npm install gulp -g
    $ npm install

To add a new icon, create the SVG file (via AI or something else) set to a base size of 512px. Then upload all the files to [IcoMoon](http://icomoon.io/app) setting the font name to: fundly-icons.

Download the generated fonts and copy the entire contents into `/src` overwriting the existing files. Then:

    $ gulp build

To bump the version number and release:

    $ gulp bump:patch // (or major, minor)
    $ git tag v0.1.2
    $ git push origin v0.1.2


## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
