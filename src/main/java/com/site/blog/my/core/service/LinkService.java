package com.site.blog.my.core.service;

import com.site.blog.my.core.entity.BlogLink;
import com.site.blog.my.core.util.PageQueryUtil;
import com.site.blog.my.core.util.PageResult;

import java.util.List;
import java.util.Map;

public interface LinkService {
    /**
     * Get links info
     *
     * @param pageUtil
     * @return
     */
    PageResult getBlogLinkPage(PageQueryUtil pageUtil);

    int getTotalLinks();

    Boolean saveLink(BlogLink link);

    BlogLink selectById(Integer id);

    Boolean updateLink(BlogLink tempLink);

    Boolean deleteBatch(Integer[] ids);

    /**
     * Return links page
     *
     * @return
     */
    Map<Byte, List<BlogLink>> getLinksForLinkPage();
}
