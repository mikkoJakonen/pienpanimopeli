(function () {

    var settings = {
        //the div under which windows are placed:
        dom: '#pienpanimopeli',
        messagesAnimationSpeed: 100,
        messagesHoverSpeed: 100
    };


    /**
     * The GUI object handles creating UI windows to show to the user. These are created as
     * HTML DOM elements shown on top of the actual game.
     *
     * @class Brew.GUI
     */
    var GUI = function () {
        this._messageWindow = $('<div><div/>')
            .addClass('brew-messages')
            .appendTo(settings.dom);

        this.resourceWindow = null;
        this.seekWindow = null;
        
        this.infoWindows = [];
    };

    GUI.prototype.resources = function (message, callback, callbackCtx) {
        this.resourceWindow = $('<div><div/>')
            .addClass('brew-window brew-resources')
            .html(message)
            .append(this.__makeButton("Osta", function () {
                var p = $(this).parent();
                p.data('type', Brew.BeerType.LAGER);
                if (p.data('callback')) p.data('callback').call(p.data('callbackCtx'));
                p.hide('drop', {
                    direction: 'right'
                }, 200, 'easeInBack', function () {
                    this.remove();
                });

            }))/*
            .append(this.__makeButton("Portteria", function () {
                var p = $(this).parent();
                p.data('type', Brew.BeerType.PORTER);
                if (p.data('callback')) p.data('callback').call(p.data('callbackCtx'));
                p.hide('drop', {
                    direction: 'right'
                }, 200, 'easeInBack', function () {
                    this.remove();
                });
            }))
            .append(this.__makeButton("Tummaa olutta", function () {
                var p = $(this).parent();
                p.data('type', Brew.BeerType.DARK);
                if (p.data('callback')) p.data('callback').call(p.data('callbackCtx'));
                p.hide('drop', {
                    direction: 'right'
                }, 200, 'easeInBack', function () {
                    this.remove();
                });
            }))*/
            .appendTo(settings.dom)
            //   .show('drop', 200, 'easeOutBack')
          //  .data('param1', type)
            .data('callback', callback)
            .data('callbackCtx', callbackCtx);
     //   alert(type);
    };

    GUI.prototype.seek = function (message, callback, callbackCtx) {
        this.seekWindow = $('<div><div/>')
            .addClass('brew-window brew-resources')
            .html(message)
            .append(this.__makeButton("OK", function () {
                var p = $(this).parent();
                if (p.data('callback')) p.data('callback').call(p.data('callbackCtx'));
                p.hide('drop', {
                    direction: 'right'
                }, 200, 'easeInBack', function () {
                    this.remove();
                });

            }))
            .appendTo(settings.dom)
            //   .show('drop', 200, 'easeOutBack')
            .data('callback', callback)
            .data('callbackCtx', callbackCtx);
    };

    GUI.prototype.toggleSeek = function (message, callback, callbackCtx) {
        this.seekWindow.toggle('slide', {
            direction: 'right',
            //  easing: 'easeOutBounce'
        }, 200);
    };

    GUI.prototype.toggleResources = function (message, callback, callbackCtx) {
        this.resourceWindow.toggle('slide', {
            direction: 'right',
            //  easing: 'easeOutBounce'
        }, 200);
    };
    
    /**
     * Show an alert window. It is a simple window with a message and an OK button
     * to dismiss the message.
     *
     * @param   {String}   message     the message to show
     * @param   {Function} callback    a callback function to call when the message has been dismissed
     * @param   {Object}   callbackCtx the context in which to call the callback function, ie. what 'this' will refer to
     */
    GUI.prototype.alert = function (message, callback, callbackCtx) {
        $('<div><div/>')
            .addClass('brew-window brew-alert')
            .html(message)
            .append(this.__makeButton('OK', function () {
                var p = $(this).parent();
                if (p.data('callback')) p.data('callback').call(p.data('callbackCtx'));
                p.hide('drop', 200, 'easeInBack', function () {
                    this.remove();
                });
            }))
            .appendTo(settings.dom)
            .show('drop', 200, 'easeOutBack')
            .data('callback', callback)
            .data('callbackCtx', callbackCtx);
    };

    
    /**
     * Show a floating info element.
     * @param   {Number} x       the screen x position to show in.
     * @param   {Number} y       the screen y position to show in
     * @param   {Str}    message the message to display
     * @returns {jQuery} the showed window
     */
    GUI.prototype.showInfo = function (x, y, message) {
        var w = $('<div></div>')
            .addClass('brew-info-window brew-window')
            .appendTo(settings.dom)
            .css({
                left: x,
                top: y
            })
            .html(message)
            .show({
                effect: 'scale',
                origin: ['left', 'center'],
                duration: 80
            });

        return w;
    };


    /**
     * Hide a previously shown info window.
     * @param {jQuery} window the window to hide (returned by showInfo).
     */
    GUI.prototype.hideInfo = function (window) {
        window.hide({
            effect: 'scale',
            origin: ['left', 'center'],
            duration: 80,
            complete: function () {
                $(this).remove();
            }
        });
    };


    /**
     * Shows a tutorial window on the top right corner of the game. If the tutorial window has been created previously,
     * calling this updates the message.
     *
     * @param {String}  message  the message to display.
     */
    GUI.prototype.showTutorialWindow = function (message, okbuttonCallback, okButtonCallbackContext) {
        var w;

        w = $('<div></div>')
            .addClass('brew-tutorial-window brew-window')
            .append($('<div></div>').addClass('brew-tutorial-content'))
            .append(this.__makeButton('OK', function () {
                var p = $(this).parent();
                if (p.data('callback')) p.data('callback').call(p.data('callbackCtx'));
            }))

        .data('callback', okbuttonCallback)
            .data('callbackCtx', okButtonCallbackContext)
            .appendTo(settings.dom)
            .show({
                effect: 'slide',
                duration: 100
            });

        this._tutorialWindow = w;
    };


    GUI.prototype.setTutorialWindow = function (message, okbuttonCallback, okButtonCallbackContext) {
        var w = this._tutorialWindow;
        w.children('.brew-tutorial-content').html(message).append(this.__makeButton('X', function () {
                var p = $(this).parent();
                if (p.data('callback')) p.data('callback').call(p.data('callbackCtx'));
            }).addClass('brew-hidebutton')                                                                  
            )
            .data('callback', okbuttonCallback)
            .data('callbackCtx', okButtonCallbackContext);
    };


    /**
     * Hide the tutorial window.
     */
    GUI.prototype.hideTutorialWindow = function () {
        this._tutorialWindow.hide({
            effect: 'slide',
            duration: 100
        });
    };


    /**
     * Show a query window to the user. The user can input text as an answer to the query, and the input
     * will be given as a parameter to the callback function.
     * @param {String}   message     The message to display with the query
     * @param {Function} callback    Function called when the user clicks the OK button.
     * @param {Object}   callbackCtx the context in which to call the callback
     */
    GUI.prototype.query = function (message, callback, callbackCtx) {
        $('<div><div/>')
            .addClass('brew-window brew-alert')
            .html(message)
            .append($('<input/>').attr({
                type: 'text',
                id: 'brew-query'
            }))
            .append(this.__makeButton('OK', function () {
                var p = $(this).parent();
                var answer = p.children('#brew-query').val();
                if (p.data('callback')) p.data('callback').call(p.data('callbackCtx'), answer);
                p.hide('drop', 200, 'easeInBack', function () {
                    this.remove();
                });
            }))
            .appendTo(settings.dom)
            .show('drop', 200, 'easeOutBack')
            .data('callback', callback)
            .data('callbackCtx', callbackCtx);
    };
    

    /**
     * Adds a message to the message display.
     *
     * @param {String} header a header for the message
     * @param {String} message the message content
     * @param {Function} buttonCallback callback to call when button pressed.
     * @param {String} buttonText text to show on a button on the message, null to have no button
     * @param {Brew.Order|Object} data message data to use.
     * @param {Object} buttonCallbackCtx context in which to call the button callback
     * @param {Function} rejectCallback callback to call when reject button pressed.
     */
    GUI.prototype.addMessage = function (header, message, data, buttonText, buttonCallback, buttonCallbackCtx, rejectCallback) {
        //FB.XFBML.parse(); //need to reparse

        var _w = $('<div><div/>')
            .addClass('brew-window brew-message')
            .html('<h2>' + header + '<h2>')
            .append($('<div><div/>')
                .addClass('brew-message-body')
                .html(message)
                //.append(this.__shareButton().data('callback', buttonCallback).data('callbackCtx', buttonCallbackCtx))
            )
            .append(this.__makeButton("X", function () {
                        var remove = true;
                        if ($(this).data('rejectCallback')) remove = $(this).data('rejectCallback').call($(this).data('callbackCtx'), $(this).parent().data('messageData'));
                        if (remove !== false) $(this).parent().hide('fold', 200, 'easeInBack', function () {
                            $(this).parent().parent().remove();
                        });
                        else e.stopPropagation();
                    }, null, 'cancel').data('rejectCallback', rejectCallback)
                    .css( { display: 'none' })
            )       
            .click(this.__messageWindowClicked)
            .hover(this.__messageWindowHover, this.__messageWindowHover)
            .data('messageData', data)
            .appendTo(this._messageWindow);


        if (buttonText) {
            _w.append(
                this.__makeButton(buttonText, function (e) {
                    var $this = $(this);
                    var remove = true;

                    if ($this.data('callback')) remove = $this.data('callback').call($this.data('callbackCtx'), $this.parent().data('messageData'));

                    if (remove !== false) $this.parent().hide('fold', 200, 'easeInBack', function () {
                        $(this).remove();
                    });
                    else e.stopPropagation();
                })
                .css({
                    display: 'none',
                    'font-size': '12pt'
                })
                .data('callback', buttonCallback)
                .data('callbackCtx', buttonCallbackCtx)
            );
        }
    };


    /**
     * Show/hide the messages display.
     */
    GUI.prototype.toggleMessages = function () {
        this.__closeOpenMessages();
        this._messageWindow.toggle('slide', {
            easing: 'easeOutBounce'
        }, 200);
    };

    //button for facebook sharing
    GUI.prototype.__shareButton = function (callback) {
        return $('<div></div>')
            .addClass('fb-share-button')
            .data('send', true)
            .data('href', "localhost:8080/pienpanimopeli/assets/sprites/single_sprites/bottle.png")
            //  .data('layout', "button-count")
            .data('action', callback)
            .css({
                margin: '0px',
                float: "right"
                    //    background: #BFA776;
                    //    text-align: center;
            })
            .click(callback);
    };


    /** Makes a DOM 'OK'-button to be added into windows.  @private */
    GUI.prototype.__makeButton = function (text, callback) {
        return $('<div></div>')
            .addClass('brew-button')
            .text(text)
            .click(callback);
    };


    /** @private */
    GUI.prototype.__messageWindowHover = function () {
        $(this).toggleClass('brew-message-extended', settings.messagesHoverSpeed);
    };


    /** @private */
    GUI.prototype.__closeOpenMessages = function () {
        $('.brew-message-open').each(function () {
            $(this).toggleClass('brew-message-open', settings.messagesAnimationSpeed, 'easeOutBounce');
            $(this).children('.brew-message-body, .brew-button').toggle('fold', {
                direction: 'up',
                easing: 'easeOutQuad'
            }, settings.messagesAnimationSpeed);
        });
    };


    /** @private */
    GUI.prototype.__messageWindowClicked = function () {
        var $this = $(this);

        if (!$this.hasClass('brew-message-open')) {
            $('.brew-message-open').each(function () {
                $(this).toggleClass('brew-message-open', settings.messagesAnimationSpeed, 'easeOutBounce');
                $(this).children('.brew-message-body, .brew-button').toggle('fold', {
                    direction: 'up',
                    easing: 'easeOutQuad'
                }, settings.messagesAnimationSpeed);
            });
        }

        $this.toggleClass('brew-message-open', settings.messagesAnimationSpeed, 'easeOutBounce');
        $this.children('.brew-message-body, .brew-button').toggle('fold', {
            direction: 'up',
            easing: 'easeOutQuad'
        }, settings.messagesAnimationSpeed);
    };



    Brew.GUI = GUI;
})();