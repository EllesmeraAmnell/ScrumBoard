$(function () {

    $('.state').droppable({
        activeClass: "active",
        hoverClass: "hover",
        tolerance: "intersect"
    });

    $('#Backlog').sortable({
        connectWith: '.state',
        receive(event, ui) {
            ui.item.removeClass('Resolved InProgress');
            ui.item.addClass('Backlog')
        }
    });

    $('#InProgress').sortable({
        connectWith: '.state',
        receive(event, ui) {
            ui.item.removeClass('Resolved Backlog');
            ui.item.addClass('InProgress')
        }
    });

    $('#Resolved').sortable({
        connectWith: '.state',
        receive(event, ui) {
            ui.item.removeClass('InProgress Backlog');
            ui.item.addClass('Resolved')
        }
    });


    $(document).on('click', '.del', function () {
            $(this.closest('div')).remove();
        }
    );

    $('#AddTask').click(
        function () {
            let task_name = $('#TaskName').val();
            if (task_name) {
                let task_div = $("<div class='task container border rounded Backlog'></div>");
                let del_block = $("<a href=\"#\" class=\"toBacklog text-primary\">Backlog</a> <a href=\"#\" class=\"toInProgress text-warning\">In Progress</a> <a href=\"#\" class=\"toResolved text-success\">Resolved</a><a href=\"#\" class=\"del\"></a>");
                task_div.append($("<p></p>").text(task_name), del_block);

                $("#Backlog").append(task_div);
            }
        }
    );

    $('#AddCol').click(
        function () {
            let col_name = $('#ColName').val();
            let new_state;
            if (col_name) {
                let col_div = $("<div class=\"col m-1 p-2 border rounded\"></div>");
                let header = $("<header class='newCol '><a href=\"#\" class=\"del\"></a><hr class=\"mt-2 mb-3\" /></header>");
                let state_div = $("<div class=\"container rounded state newState\"></div>");
                header.prepend($("<h5 style='display: inline-block;'></h5>").text(col_name));
                col_div.append(header, state_div);
                $("#Content").append(col_div);

                new_state = $('.newState');
                new_state.sortable({
                    connectWith: '.state',
                    receive(event, ui) {
                        ui.item.removeClass('Resolved InProgress Backlog');
                        ui.item.addClass('newState')
                    }
                });

                new_state.droppable({
                    activeClass: "active",
                    hoverClass: "hover",
                    tolerance: "intersect"
                });
            }
        }
    );

    $(document).on('click', '.toBacklog', function () {
            let task = $(this.closest('div'));
            if (!task.hasClass('Backlog')) {
                task.removeClass('Resolved InProgress');
                task.addClass('Backlog');
                task.appendTo($('#Backlog'));
            }
        }
    );

    $(document).on('click', '.toInProgress', function () {
            let task = $(this.closest('div'));
            if (!task.hasClass('InProgress')) {
                task.removeClass('Resolved Backlog');
                task.addClass('InProgress');
                task.appendTo($('#InProgress'));
            }
        }
    );

    $(document).on('click', '.toResolved', function () {
            let task = $(this.closest('div'));
            if (!task.hasClass('Resolved')) {
                task.removeClass('InProgress Backlog');
                task.addClass('Resolved');
                task.appendTo($('#Resolved'));
            }
        }
    );

});

