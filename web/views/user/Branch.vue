<script lang="ts">
import { defineComponent } from "vue";
import Header from "./Header.vue";
import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";


export default defineComponent({
    name: "Branch",
    data: function (){
        return {
            cc: [] as string[]
        };
    },
    props: {
        branches: {
            type: Array,
            required: true,
        },
    },
    setup(props, ctx) {
        console.log(props.branches);
    },
    components: { Footer, Header, NavBar },
    methods: {
        getBranchs: function (){
           return [
            'hello world','cc cc 2 cc1'
           ]
        }
    },
    beforeMount: function (){
        this.cc = this.getBranchs();
    }
});
</script>

<template>
    <NavBar />
    <Header title="Chi nhánh" />
    <!-- BMI Calculation Start -->
    <div class="container-fluid position-relative bmi mt-5" style="margin-bottom: 90px;">
        <div class="container">
            <div class="row px-3 align-items-center">
                <div class="col-md-6">
                    <div class="pr-md-3 d-none d-md-block">
                        <h4 class="text-primary">Body Mass Index </h4>
                        <h4 class="display-4 text-white font-weight-bold mb-4">Whate is BMI?</h4>
                        <p class="m-0 text-white">Vero elitr lorem magna justo magna justo at justo est ipsum sed clita
                            lorem dolor ipsum sed. Lorem sea lorem vero. Sanct dolor clita clita rebum kasd magna erat
                            diam</p>
                    </div>
                </div>
                <div class="col-md-6 bg-secondary py-5">
                    <div class="py-5 px-3">
                        <h1 class="mb-4 text-white">Calculate your BMI</h1>
                        <form>
                            <div class="form-row">
                                <div class="col form-group">
                                    <input type="text" class="form-control form-control-lg bg-dark text-white"
                                           placeholder="Weight (KG)">
                                </div>
                                <div class="col form-group">
                                    <input type="text" class="form-control form-control-lg bg-dark text-white"
                                           placeholder="Height (CM)">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col form-group">
                                    <input type="text" class="form-control form-control-lg bg-dark text-white"
                                           placeholder="Age">
                                </div>
                                <div class="col form-group">
                                    <select class="custom-select custom-select-lg bg-dark text-muted">
                                        <option>Gender</option>
                                        <option>Mal</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col">
                                    <input type="button" class="btn btn-lg btn-block btn-dark border-light"
                                           value="Calculate Now">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- BMI Calculation End -->


    <div v-for="item in cc" :key="item">{{item}}</div>

    <Footer />
</template>

<style scoped>

</style>
