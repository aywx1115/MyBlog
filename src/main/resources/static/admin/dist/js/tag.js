$(function () {
    $("#jqGrid").jqGrid({
        url: '/admin/tags/list',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'tagId', index: 'tagId', width: 50, key: true, hidden: true},
            {label: 'Tags', name: 'tagName', index: 'tagName', width: 240},
            {label: 'Create Time', name: 'createTime', index: 'createTime', width: 120}
        ],
        height: 560,
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
});

/**
 * jqGrid
 */
function reload() {
    var page = $("#jqGrid").jqGrid('getGridParam', 'page');
    $("#jqGrid").jqGrid('setGridParam', {
        page: page
    }).trigger("reloadGrid");
}

function tagAdd() {
    var tagName = $("#tagName").val();
    if (!validCN_ENString2_18(tagName)) {
        swal("Wrong format", {
            icon: "error",
        });
    } else {
        var url = '/admin/tags/save?tagName=' + tagName;
        $.ajax({
            type: 'POST',
            url: url,
            success: function (result) {
                if (result.resultCode == 200) {
                    $("#tagName").val('')
                    swal("Save success", {
                        icon: "success",
                    });
                    reload();
                }
                else {
                    $("#tagName").val('')
                    swal(result.message, {
                        icon: "error",
                    });
                }
                ;
            },
            error: function () {
                swal("Action failed", {
                    icon: "error",
                });
            }
        });
    }
}

function deleteTag() {
    var ids = getSelectedRows();
    if (ids == null) {
        return;
    }
    swal({
        title: "Notices",
        text: "Are you sure to delete?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((flag) => {
            if (flag) {
                $.ajax({
                    type: "POST",
                    url: "/admin/tags/delete",
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
