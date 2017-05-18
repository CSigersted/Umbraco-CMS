(function () {
    "use strict";

    function UserEditController($scope, $timeout, $location, usersResource) {

        var vm = this;

        vm.loading = false;
        vm.page = {};
        vm.user = {};

        vm.goBack = goBack;
        vm.openUserRolePicker = openUserRolePicker;
        vm.openContentPicker = openContentPicker;
        vm.openMediaPicker = openMediaPicker;
        vm.removeSelectedItem = removeSelectedItem;
        vm.disableUser = disableUser;
        vm.resetPassword = resetPassword;
        vm.getUserStateType = getUserStateType;
        vm.changeAvatar = changeAvatar;

        function init() {

            vm.loading = true;

            // get user
            usersResource.getUser().then(function (user) {
                vm.user = user;
            });

            // fake loading
            $timeout(function () {
                vm.loading = false;
            }, 500);
            
        }

        function goBack() {
            $location.path("/users/users/overview").search("subview", "users");
        }

        function openUserRolePicker() {
            vm.userRolePicker = {
                title: "Select user roles",
                view: "userrolepicker",
                selection: vm.user.userRoles,
                closeButtonLabel: "Cancel",
                show: true,
                submit: function(model) {
                    // apply changes
                    if(model.selection) {
                        vm.user.userRoles = model.selection;
                    }
                    vm.userRolePicker.show = false;
                    vm.userRolePicker = null;
                },
                close: function(oldModel) {
                    // rollback on close
                    if(oldModel.selection) {
                        vm.user.userRoles = oldModel.selection;
                    }
                    vm.userRolePicker.show = false;
                    vm.userRolePicker = null;
                }
            };
        }

        function openContentPicker() {
            vm.contentPicker = {
                title: "Select content start node",
                view: "contentpicker",
                multiPicker: true,
                show: true,
                submit: function(model) {
                    if(model.selection) {
                        vm.user.startNodesContent = model.selection;
                    }
                    vm.contentPicker.show = false;
                    vm.contentPicker = null;
                },
                close: function(oldModel) {
                    vm.contentPicker.show = false;
                    vm.contentPicker = null;
                }
            };
        }

        function openMediaPicker() {
            vm.contentPicker = {
                title: "Select media start node",
                view: "treepicker",
                section: "media",
                treeAlias: "media",
                entityType: "media",
                multiPicker: true,
                show: true,
                submit: function(model) {
                    if(model.selection) {
                        vm.user.startNodesMedia = model.selection;
                    }
                    vm.contentPicker.show = false;
                    vm.contentPicker = null;
                },
                close: function(oldModel) {
                    vm.contentPicker.show = false;
                    vm.contentPicker = null;
                }
            };
        }

        function removeSelectedItem(index, selection) {
            selection.splice(index, 1);
        }

        function disableUser() {
            alert("disable user");
        }

        function resetPassword() {
            alert("reset password");
        }

        function getUserStateType(state) {
            switch (state) {
                case "disabled" || "umbracoDisabled":
                    return "danger";
                case "pending":
                    return "warning";
                default:
                    return "success";
            }
        }

        function changeAvatar() {
            alert("change avatar");
        }
 
        init();

    }

    angular.module("umbraco").controller("Umbraco.Editors.Users.UserController", UserEditController);

})();
