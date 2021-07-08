<template>
    <div class="nav-index">
        <div class="nav-menu">
            <!-- <img :src="defaultIcon" alt="icon" class="nav-image" /> -->
            <el-image
                class="nav-image"
                :src="defaultIcon"
                fit="cover"
            ></el-image>
            <el-menu class="nav-el-menu">
                <div v-for="(item, index) in navMenu" :key="index">
                    <el-submenu
                        :index="index"
                        v-if="item.children && item.children.length"
                    >
                        <template #title>
                            <i :class="item.icon || 'el-icon-star-off'"></i>
                            <span>{{ item.name }}</span>
                        </template>
                        <div
                            v-for="(item1, index1) in item.children"
                            :key="index1"
                            @click="goToNavList(item1)"
                            class="menu-children"
                        >
                            <el-menu-item :index="index + '-' + index1">
                                <i
                                    :class="item1.icon || 'el-icon-star-off'"
                                ></i>
                                <template #title>{{ item1.name }}</template>
                            </el-menu-item>
                        </div>
                    </el-submenu>
                    <el-menu-item
                        :index="index"
                        v-else
                        @click="goToNavList(item)"
                    >
                        <i :class="item.icon || 'el-icon-star-off'"></i>
                        <template #title>{{ item.name }}</template>
                    </el-menu-item>
                </div>
            </el-menu>
            <el-button
                type="primary"
                @click="openDialog('addDir', item)"
                icon="el-icon-circle-plus-outline"
            ></el-button>
        </div>
        <div class="nav-list">
            <div v-for="(item, index) in navList" :key="index" class="nav-wrap">
                <div class="nav-header" :id="item.id">
                    <i :class="item.icon || 'el-icon-s-flag'"></i>{{ item.name
                    }}<i
                        class="el-icon-circle-plus-outline"
                        @click="openDialog('addNav', { icon: defaultIcon }, item)"
                    ></i>
                </div>
                <div class="nav-content">
                    <div
                        v-for="(item1, index1) in item.list"
                        :key="index1"
                        class="nav-box"
                        @click="goToUrl(item1)"
                    >
                        <i class="el-icon-close"></i>
                        <div class="nav-box-inner">
                            <div class="nav-icon">
                                <img
                                    :src="item1.icon || defaultIcon"
                                    alt="icon"
                                />
                            </div>
                            <div class="nav-icon-right">
                                <p class="nav-name ellipsis">
                                    {{ item1.name }}
                                </p>
                                <p class="nav-desc ellipsis">
                                    {{ item1.desc }}
                                </p>
                            </div>
                        </div>
                        <i
                            class="el-icon-edit-outline"
                            @click.stop="openDialog('editNav', item1, item)"
                        ></i>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="提示" v-model="dialogVisible" width="30%" @close="dialogVisible = false">
            <el-form
                :model="dialog.data"
                :rules="dialogRules"
                ref="dialogDataRef"
                label-width="120px"
            >
                <el-form-item label-width="0">
                    <el-image
                        style="width: 68px; height: 68px"
                        :src="dialog.data.icon || defaultIcon"
                        fit="cover"
                    >
                        <template #error>
                            <div class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </template>
                    </el-image>
                </el-form-item>
                <el-form-item label="网站名称:" prop="name">
                    <el-input v-model.trim="dialog.data.name"></el-input>
                </el-form-item>
                <el-form-item label="网站网址:" prop="url">
                    <el-input v-model.trim="dialog.data.url"></el-input>
                </el-form-item>
                <el-form-item label="网站介绍:" prop="desc">
                    <el-input v-model.trim="dialog.data.desc"></el-input>
                </el-form-item>
                <el-form-item label="图标URL:" prop="icon">
                    <el-input v-model.trim="dialog.data.icon"></el-input>
                </el-form-item>
                <el-form-item label="主页图标:"
                    ><el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button @click="getWebIcon">自动获取网站图标</el-button
                        ><!--
                    --><template #trigger>
                            <el-button @click="uploadIcon"
                                >自定义图标</el-button
                            >
                        </template>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitDialog"
                        >确 定</el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, onBeforeUnmount, toRaw, computed, watch } from "vue";
import { ElForm } from 'element-plus';
import defaultIcon from "@/assets/logo.png";
import api from '../../service/nav';
import _ from 'lodash';

interface NavMenu{
    name: string,
    id?: string,
    list?: NavList[],
    children: NavMenu[]
}
interface NavList{
    name: string,
    desc: string,
    icon: string,
    url: string 
}
interface Dialog{
    data: NavList,
    type: string,
    parent?: NavMenu
}

export default defineComponent({
    name: "nav",
    setup: () => {
        //  刷新页面,导航菜单保存到localStorage
        const beforeunloadFn = () => {
            localStorage.setItem('navMenu', JSON.stringify(navMenu));
        };
        let navMenuDefault = [
            {
                name: "网站1",
                id: "web1",
                children: [
                    {
                        name: "网站5",
                        id: "web5",
                        list: [
                            {
                                name: "掘金",
                                desc:
                                    "掘金是一个帮助开发者成长的社区,是给开发者用的Hacker News,给设计师用的Designer News,和给产品经理用的Medium。",
                                icon: "",
                                url: "https://juejin.cn/",
                            },
                            {
                                name: "xxxx1",
                                desc:
                                    "qqqqqqqqqqqq1ssssssssssssssssssssssssssssssssssssssssssssssssssssssqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
                                icon: "",
                            },
                            {
                                name: "掘金",
                                desc:
                                    "掘金是一个帮助开发者成长的社区,是给开发者用的Hacker News,给设计师用的Designer News,和给产品经理用的Medium。",
                                icon: "",
                                url: "https://juejin.cn/",
                            },
                            {
                                name: "xxxx1",
                                desc:
                                    "qqqqqqqqqqqq1ssssssssssssssssssssssssssssssssssssssssssssssssssssssqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
                                icon: "",
                            },
                        ],
                    },
                    {
                        name: "网站6",
                        id: "web6",
                        list: [
                            {
                                name: "掘金",
                                desc:
                                    "掘金是一个帮助开发者成长的社区,是给开发者用的Hacker News,给设计师用的Designer News,和给产品经理用的Medium。",
                                icon: "",
                                url: "https://juejin.cn/",
                            },
                            {
                                name: "xxxx1",
                                desc:
                                    "qqqqqqqqqqqq1ssssssssssssssssssssssssssssssssssssssssssssssssssssssqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
                                icon: "",
                            },
                        ],
                    },
                ],
            },
            { name: "网站2", id: "web2", list: [] },
        ];
        let navMenu = reactive<NavMenu[]>([]);
        let getNavMenu = localStorage.getItem('navMenu');
        navMenu = (getNavMenu && JSON.parse(getNavMenu).length) ? JSON.parse(getNavMenu) : navMenuDefault;
        window.addEventListener('beforeunload', beforeunloadFn, false);
        onBeforeUnmount(() => {
            window.removeEventListener('beforeunload', beforeunloadFn, false); 
        });
        let dialogVisible = ref<boolean>(false);
        let dialogRules = reactive({
            name: [
                { required: true, message: "请输入网站名称", trigger: "blur" },
                {
                    min: 1,
                    max: 100,
                    message: "长度在 1 到 100 个字符",
                    trigger: "blur",
                },
            ],
            url: [
                { required: true, message: "请输入网站网址", trigger: "blur" },
            ],
            desc: [
                {
                    min: 3,
                    max: 255,
                    message: "长度在 3 到 255 个字符",
                    trigger: "blur",
                },
            ],
            icon: [
                { required: true, message: "请上传网站图标", trigger: "blur" },
            ],
        });
        let dialog = reactive<Dialog>({data: {name: '', desc: '', icon: '', url: ''}, type: '', parent: {name: '', children: []}});
        //  根据导航菜单合成导航列表
        const navList = computed(() => {
            return navMenu.length ? navMenuForEach(navMenu, []) : [];
        });
        const navMenuForEach = (item: NavMenu[], arr: NavMenu[]) => {
            item.forEach((v: NavMenu) => {
                v.list && arr.push(v);
                v.children && (arr = navMenuForEach(v.children, arr));
            });
            return arr;
        };
        //  根据网址去获取网站图标
        const getWebIcon = () => {
            dialogDataRef.value?.validateField('name', async errMsg => {
                if (errMsg) {
                    console.log("校验未通过");
                    return;
                } else {
                    console.log("校验通过");
                    let url = dialog.data.url.split('/');
                    let newUrl = url[0] + '//' + url[2];
                    let res:any = await api.getWebIconApi({targetUrl: newUrl});
                    dialog.data.icon = res.icon ? res.icon : newUrl + '/favicon.ico';
                }
            });
        };
        const goToUrl = (item: NavList) => {
            item.url && (window.location.href = item.url);
        };
        const goToNavList = (item: NavMenu) => {
            let id = "#" + item.id;
            document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
        };
        const dialogDataRef = ref<InstanceType<typeof ElForm>>();
        const changeNavMenu = (item: NavMenu) => {
            if (dialog.type == "addNav") {
                item.list ? item.list.push(dialog.data) : (item.list = [dialog.data]);
            } else if (dialog.type == "editNav") {
                let index = item?.list?.findIndex((item:NavList) => item.name === dialog.data.name);
                index && index > -1 && item?.list?.splice(index, 1, dialog.data);
            } else if (dialog.type == "addDir") {
            }
        };
        const submitDialog = () => {
            console.log("aa111", dialogDataRef.value);
            dialogDataRef.value?.validate((valid: any) => {
                if (valid) {
                    for(let i = 0; i < navMenu.length; i++) {
                        if(navMenu[i].name === dialog.parent?.name){
                            changeNavMenu(navMenu[i]);
                            break;
                        }
                        if(navMenu[i]?.children?.length){
                            for(let j = 0; j < navMenu[i].children.length; j++) {
                                if(navMenu[i].children[j].name === dialog.parent?.name){
                                    changeNavMenu(navMenu[i].children[j]);
                                    break;
                                }
                            };
                        };
                    };
                    dialogVisible.value = false;
                } else {
                    return false;
                }
            });
        };
        const openDialog = (type: string, item: any, parent: any) => {
            dialog.data = _.cloneDeep(item);
            dialog.type = _.cloneDeep(type);
            dialog.parent = _.cloneDeep(parent);
            dialogVisible.value = true;
        };
        const uploadIcon = () => {};
        watch(
            () => navMenu,
            (oldVal:any, newVal:any) => {
                console.log('111watch', oldVal, newVal);
            },
            {deep: true}
        );
        return {
            navList,
            navMenu,
            defaultIcon,
            goToUrl,
            goToNavList,
            dialogVisible,
            submitDialog,
            openDialog,
            dialogRules,
            uploadIcon,
            dialog,
            dialogDataRef,
            getWebIcon
        };
    },
});
</script>

<style lang="scss">
.nav-index {
    width: 100%;
    height: 100%;
    display: flex;
    .nav-menu {
        width: 300px;
        height: 100%;
        border-right: solid 1px #e6e6e6;
        box-sizing: border-box;
        padding: 15px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        .nav-image {
            width: 68px; 
            height: 68px;
            margin-bottom: 25px;
        }
        .nav-el-menu {
            border: none;
            width: 100%;
            // flex: 1;
            // min-height: 0;
        }
        .menu-children {
            .el-menu-item {
                padding-left: 70px !important;
            }
        }
        .el-submenu__title{
            &:after{
                content: "";
                display: none;
            }
            &:hover:after{
                display: block;
            }
        }
    }
    .nav-list {
        flex: 1;
        min-width: 0;
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
        box-sizing: border-box;
        padding: 15px;
        .nav-wrap {
            width: 100%;
            height: auto;
            &:not(:last-child) {
                margin-bottom: 15px;
            }
            .nav-header {
                height: 30px;
                line-height: 30px;
                // margin-bottom: 15px;
                text-align: left;
                font-weight: bold;
                box-sizing: border-box;
                padding: 0 5px;
                i {
                    margin-right: 15px;
                }
                &:hover {
                    background-color: rgba(61, 75, 249, 0.04);
                    filter: grayscale(0);
                    .el-icon-circle-plus-outline {
                        display: block;
                    }
                }
                .el-icon-circle-plus-outline {
                    display: none;
                    float: right;
                    line-height: 30px;
                    cursor: pointer;
                }
            }
            .nav-content {
                height: auto;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                .nav-box {
                    width: 25%;
                    background: #fff;
                    padding: 15px 5px;
                    box-sizing: border-box;
                    border-radius: 10px;
                    height: 136px;
                    display: flex;
                    i {
                        display: none;
                        font-size: 20px;
                        transition: all 0.3s ease;
                        cursor: pointer;
                    }
                    &:hover {
                        background: rgba(0, 0, 0, 0.2);
                        // .nav-box-inner{
                        //   border: none;
                        // }
                        i {
                            display: block;
                        }
                    }
                    .nav-box-inner {
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                        border: 1px solid #e4ecf3;
                        border-radius: 10px;
                        transition: all 0.3s ease;
                        display: flex;
                        padding: 15px 25px;
                        box-sizing: border-box;
                    }
                    .ellipsis {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        word-break: break-word;
                    }
                    .nav-icon {
                        margin-right: 25px;
                        width: 74px;
                        height: 74px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .nav-icon-right {
                        flex: 1;
                        min-width: 0;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        text-align: left;
                        .nav-name {
                            margin-bottom: 10px;
                            width: 100%;
                        }
                        .nav-desc {
                        }
                    }
                }
            }
        }
    }
    .el-dialog {
        // width: 388px;
        // height: 435px;
        border-radius: 8px;
        padding: 12px 12px 30px;
    }
}
</style>
