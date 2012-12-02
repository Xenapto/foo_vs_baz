module ApplicationHelper

  def embed_file(path)
    str = ""
    str += "<p><code>#{path}</code></p>"
    str += "<pre><code>#{File.open("#{Rails.root}/#{path}").read.gsub('<','&lt;').gsub('>','&gt;').strip}</code></pre>"
    str.html_safe
  end
end
