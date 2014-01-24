# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'fundly/icon/font/version'

Gem::Specification.new do |spec|
  spec.name          = "fundly-icon-font"
  spec.version       = Fundly::Icon::Font::VERSION
  spec.authors       = ["jimmynicol"]
  spec.email         = ["james@fundly.com"]
  spec.description   = "Icon font set for Fundly.com"
  spec.summary       = "General purpose svg font set including categories and location icons"
  spec.homepage      = "https://github.com/fundly/fundly-icon-font"
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
end
