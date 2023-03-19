$(function () {
    $("#jqGrid").jqGrid({
        url: '/admin/links/list',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'linkId', index: 'linkId', width: 50, key: true, hidden: true},
            {label: 'Link Name', name: 'linkName', index: 'linkName', width: 100},
            {label: 'Link Url', name: 'linkUrl', index: 'linkUrl', width: 120},
            {label: 'Link Descr', name: 'linkDescription', index: 'linkDescription', width: 120},
            {label: 'Rank', name: 'linkRank', index: 'linkRank', width: 30},
            {label: 'Create Time', name: 'createTime', index: 'createTime', width: 100}
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

function linkAdd() {
    reset();
    $('.modal-title').html('Links add');
    $('#linkModal').modal('show');
}

//绑定modal上的保存按钮
$('#saveButton').click(function () {
    var linkId = $("#linkId").val();
    var linkName = $("#linkName").val();
    var linkUrl = $("#linkUrl").val();
    var linkDescription = $("#linkDescription").val();
    var linkRank = $("#linkRank").val();
    if (!validCN_ENString2_18(linkName)) {
        $('#edit-error-msg').css("display", "block");
        $('#edit-error-msg').html("Pls check format！");
        return;
    }
    if (!isURL(linkUrl)) {
        $('#edit-error-msg').css("display", "block");
        $('#edit-error-msg').html("Pls check format！");
        return;
    }
    if (!validCN_ENString2_100(linkDescription)) {
        $('#edit-error-msg').css("display", "block");
        $('#edit-error-msg').html("Pls check format！");
        return;
    }
    if (isNull(linkRank) || linkRank < 0) {
        $('#edit-error-msg').css("display", "block");
        $('#edit-error-msg').html("Pls check format！");
        return;
    }
    var params = $("#linkForm").serialize();
    var url = '/admin/links/save';
    if (linkId != null && linkId > 0) {
        url = '/admin/links/update';
    }
    $.ajax({
        type: 'POST',
        url: url,
        data: params,
        success: function (result) {
            if (result.resultCode == 200 && result.data) {
                $('#linkModal').modal('hide');
                swal("Save success", {
                    icon: "success",
                });
                reload();
            }
            else {
                $('#linkModal').modal('hide');
                swal("Save failed", {
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

});

function linkEdit() {
    var id = getSelectedRow();
    if (id == null) {
        return;
    }
    reset();
    $.get("/admin/links/info/" + id, function (r) {
        if (r.resultCode == 200 && r.data != null) {
            //填充数据至modal
            $("#linkName").val(r.data.linkName);
            $("#linkUrl").val(r.data.linkUrl);
            $("#linkDescription").val(r.data.linkDescription);
            $("#linkRank").val(r.data.linkRank);
            if (r.data.linkType == 1) {
                $("#linkType option:eq(1)").prop("selected", 'selected');
            }
            if (r.data.linkType == 2) {
                $("#linkType option:eq(2)").prop("selected", 'selected');
            }
        }
    });
    $('.modal-title').html('Link Edit');
    $('#linkModal').modal('show');
    $("#linkId").val(id);
}

function deleteLink() {
    var ids = getSelectedRows();
    if (ids == null) {
        return;
    }
    swal({
        title: "Notice",
        text: "Are you sure to delete?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((flag) => {
            if (flag) {
                $.ajax({
                    type: "POST",
                    url: "/admin/links/delete",
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

function reset() {
    $("#linkName").val('');
    $("#linkUrl").val('');
    $("#linkDescription").val('');
    $("#linkRank").val(0);
    $('#edit-error-msg').css("display", "none");
    $("#linkType option:first").prop("selected", 'selected');
}