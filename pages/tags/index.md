---
title: 分类
layout: default
---
<div id='tag_cloud'>
{% for cat in site.categories %}
<a href="#{{ cat[0] }}" title="{{ cat[0] }}" rel="{{ cat[1].size }}">{{ cat[0] }} ({{ cat[1].size }})</a>
{% endfor %}
</div>

<ul class="listing">
{% for cat in site.categories %}
  <li class="listing-seperator" id="{{ cat[0] }}">{{ cat[0] }}</li>
{% for post in cat[1] %}
  <li class="listing-item">
 
  <a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
  </li>
{% endfor %}
{% endfor %}
</ul>

<script src="{{ site.url }}/js/tag.js"></script>
