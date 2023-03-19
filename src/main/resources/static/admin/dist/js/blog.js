$(function () {
    $("#jqGrid").jqGrid({
        url: '/admin/blogs/list',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'blogId', index: 'blogId', width: 50, key: true, hidden: true},
            {label: 'Title', name: 'blogTitle', index: 'blogTitle', width: 140},
            {label: 'Image', name: 'blogCoverImage', index: 'blogCoverImage', width: 120, formatter: coverImageFormatter},
            {label: 'Views', name: 'blogViews', index: 'blogViews', width: 60},
            {label: 'Status', name: 'blogStatus', index: 'blogStatus', width: 60, formatter: statusFormatter},
            {label: 'Category', name: 'blogCategoryName', index: 'blogCategoryName', width: 60},
            {label: 'Create Time', name: 'createTime', index: 'createTime', width: 90}
        ],
        height: 700,
        rowNum: 10,
        rowList: [10, 20, 50],
        styleUI: 'Bootstrap',
        loadtext: 'Loading...',
        rownumbers: false,
        rownumWidth: 20,
        autowidth: true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader: {
            root: "data.list",
            page: "data.currPage",
            total: "data.totalPage",
            records: "data.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order",
        },
        gridComplete: function () {

            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });

    $(window).resize(function () {
        $("#jqGrid").setGridWidth($(".card-body").width());
    });

    function coverImageFormatter(cellvalue) {
        return "<img src='" + cellvalue + "' height=\"120\" width=\"160\" alt='coverImage'/>";
    }

    function statusFormatter(cellvalue) {
        if (cellvalue == 0) {
            return "<button type=\"button\" class=\"btn btn-block btn-secondary btn-sm\" style=\"width: 50%;\">Draft</button>";
        }
        else if (cellvalue == 1) {
            return "<button type=\"button\" class=\"btn btn-block btn-success btn-sm\" style=\"width: 50%;\">Publish</button>";
        }
    }

});

/**
 * Search function
 */
function search() {

    var keyword = $('#keyword').val();
    if (!validLength(keyword, 20)) {
        swal("Keywords is too long!", {
            icon: "error",
        });
        return false;
    }

    var searchData = {keyword: keyword};

    $("#jqGrid").jqGrid("setGridParam", {postData: searchData});

    $("#jqGrid").jqGrid("setGridParam", {page: 1});

    $("#jqGrid").jqGrid("setGridParam", {url: '/admin/blogs/list'}).trigger("reloadGrid");
}

/**
 * jqGrid
 */
function reload() {
    var page = $("#jqGrid").jqGrid('getGridParam', 'page');
    $("#jqGrid").jqGrid('setGridParam', {
        page: page
    }).trigger("reloadGrid");
}

function addBlog() {
    window.location.href = "/admin/blogs/edit";
}

function editBlog() {
    var id = getSelectedRow();
    if (id == null) {
        return;
    }
    window.location.href = "/admin/blogs/edit/" + id;
}

function deleteBlog() {
    var ids = getSelectedRows();
    if (ids == null) {
        return;
    }
    swal({
        title: "Notice",
        text: "Are your sure to delete?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((flag) => {
            if (flag) {
                $.ajax({
                    type: "POST",
                    url: "/admin/blogs/delete",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.resultCode == 200) {
                            swal("Delete success", {
                                icon: "success",
                            });
                            $("#jqGrid").trigger("reloadGrid");
                        } else {
                            swal(r.message, {
                                icon: "error",
                            });
                        }
                    }
                });
            }
        }
    );
}