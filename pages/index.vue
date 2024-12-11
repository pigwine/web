<template>
    <BoxContainer>
        <BoxDescribe />
        <BoxButton 
            label="立即申请加入"
            description="点击按钮加入等待名单"
            buttonClass="bg-green-500 hover:bg-green-600"
            @click="handleClick"
        />
    </BoxContainer>
    
</template>

<script setup>
const handleClick = () => {
    navigateTo('/waitlist')
}
</script>