module Fundly
  module Icon
    module Font
      class Engine < ::Rails::Engine
        initializer 'fundly-icon-font.assets.precompile' do |app|
          app.config.assets.precompile += %w(
            fundly-icons.eot fundly-icons.svg
            fundly-icons.ttf fundly-icons.woff)
        end
      end
    end
  end
end