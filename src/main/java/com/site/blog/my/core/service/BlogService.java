package com.site.blog.my.core.service;

import com.site.blog.my.core.controller.vo.BlogDetailVO;
import com.site.blog.my.core.controller.vo.SimpleBlogListVO;
import com.site.blog.my.core.entity.Blog;
import com.site.blog.my.core.util.PageQueryUtil;
import com.site.blog.my.core.util.PageResult;

import java.util.List;

public interface BlogService {
    String saveBlog(Blog blog);

    PageResult getBlogsPage(PageQueryUtil pageUtil);

    Boolean deleteBatch(Integer[] ids);

    int getTotalBlogs();

    /**
     * Get info by id
     *
     * @param blogId
     * @return
     */
    Blog getBlogById(Long blogId);

    /**
     * Edit blog
     *
     * @param blog
     * @return
     */
    String updateBlog(Blog blog);

    /**
     * Get blogs
     *
     * @param page
     * @return
     */
    PageResult getBlogsForIndexPage(int page);

    /**
     * Get blogs info
     *
     *
     * @param type
     * @return
     */
    List<SimpleBlogListVO> getBlogListForIndexPage(int type);
    /**
     * Blog detail
     *
     * @param blogId
     * @return
     */
    BlogDetailVO getBlogDetail(Long blogId);

    /**
     * Get blog by tag
     *
     * @param tagName
     * @param page
     * @return
     */
    PageResult getBlogsPageByTag(String tagName, int page);

    /**
     * Get blog by category
     *
     * @param categoryId
     * @param page
     * @return
     */
    PageResult getBlogsPageByCategory(String categoryId, int page);

    /**
     * Get blog by search
     *
     * @param keyword
     * @param page
     * @return
     */
    PageResult getBlogsPageBySearch(String keyword, int page);

    BlogDetailVO getBlogDetailBySubUrl(String subUrl);
}
