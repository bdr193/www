module ApplicationHelper
  include CloudinaryHelper
  def image_url_with_fallback(_image_url)
    if _image_url.strip.empty?
      image_url 'social/home_facebook_card.jpg'
    else
      _image_url.strip
    end
  end

  def markdown(content)
    return "" if content.blank?
    @markdown ||= (
      renderer = Redcarpet::Render::HTML.new
      Redcarpet::Markdown.new(renderer, extensions = {})
    )
    @markdown.render(content).html_safe
  end

  def structure(hash)
    object = JSON.parse(hash.to_json, object_class: OpenStruct)
  end

  def locale_current_url_for(locale)
    if locale == I18n.default_locale
      begin
        return url_for(controller: params[:controller], action: params[:action], locale: nil)
      rescue ActionController::UrlGenerationError
      end
    end
    url_for(controller: params[:controller], action: params[:action], locale: locale)
  rescue ActionController::UrlGenerationError => e
    puts e.message
  end

  def alumnus_profile_path(alumnus)
    "https://kitt.lewagon.com/alumni/#{alumnus.github_nickname}"
  end

  def prerender?
    ENV['PRERENDER'] == 'false' ? false : true
  end

  WWW_IMAGES_BASE_URL = "https://raw.githubusercontent.com/lewagon/www-images/master"

  def author_image_tag(slug, options = {})
    image_tag proxy_url_with_signature(url: "#{WWW_IMAGES_BASE_URL}/blog/authors/#{slug}")
  end

  def user_image_tag(slug, options = {}, html_options = {})
    image_tag proxy_url_with_signature(options.merge(url: "#{WWW_IMAGES_BASE_URL}/users/#{slug}")), html_options
  end

  def post_image_url(slug, options = {})
    return slug if slug =~ /^http/  # Handy to quickly try a post background image from a URL.
    proxy_url_with_signature options.merge(url: "#{WWW_IMAGES_BASE_URL}/blog/posts/#{slug}")
  end

  def content_post_image_tag(slug, options = {})
    image_tag proxy_url_with_signature(options.merge(url: "#{WWW_IMAGES_BASE_URL}/blog/posts/#{slug}"))
  end

  def video_image_url(slug, options = {})
    proxy_url_with_signature options.merge(url: "#{WWW_IMAGES_BASE_URL}/blog/videos/#{slug}")
  end

  def story_image_url(slug, options = {})
    proxy_url_with_signature options.merge(url: "#{WWW_IMAGES_BASE_URL}/stories/#{slug}")
  end

  def cl_adaptive_image_tag(image_path, opt={})
    w = opt[:width]
    h = opt[:height]
    image_url_2x = cl_image_path image_path, width: 2 * w, height: 2 * h, crop: :fill
    image_url = cl_image_path image_path, width: w, height: h, crop: :fill
    opt[:srcset] = "#{image_url} 1x, #{image_url_2x} 2x"
    return cl_image_tag image_path, opt
  end

  def critical_css
    raw @critical_css
  end
end
