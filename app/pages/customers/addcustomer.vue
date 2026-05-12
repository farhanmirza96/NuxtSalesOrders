<template>
  <div>
    <div class="pt-2 mb-6">
        <header>
            <h1 class="text-2xl font-bold rounded-md p-2 bg-[#5E7AC4] text-white">Add Customer</h1>
        </header>
    </div>

    <form>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="first_name" class="block mb-2.5 text-sm font-medium text-heading">First name*</label>
          <input type="text" id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="First Name" required />
        </div>
        <div>
          <label for="last_name" class="block mb-2.5 text-sm font-medium text-heading">Last name</label>
          <input type="text" id="last_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="Last Name" />
        </div>
        <div>
          <label for="company" class="block mb-2.5 text-sm font-medium text-heading">Company*</label>
          <input type="text" id="company"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="Company name" required />
        </div>
        <div>
          <label for="phone" class="block mb-2.5 text-sm font-medium text-heading">Phone number</label>
          <input type="tel" id="phone"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="03xxxxxxxxx" />
        </div>
        <div>
          <label for="website" class="block mb-2.5 text-sm font-medium text-heading">Website URL</label>
          <input type="url" id="website"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="website address" />
        </div>
        <div>
          <label for="email" class="block mb-2.5 text-sm font-medium text-heading">Email address</label>
          <input type="email" id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
            placeholder="abc@company.com" />
        </div>
      </div>
      <div class="mb-6">
        <label for="address" class="block mb-2.5 text-sm font-medium text-heading">Address</label>
        <input type="text" id="address"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400"
          placeholder="Address" />
      </div>
      <!-- <div class="mb-6">
        <label for="password" class="block mb-2.5 text-sm font-medium text-heading">Password</label>
        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400" placeholder="•••••••••" />
    </div> 
    <div class="mb-6">
        <label for="confirm_password" class="block mb-2.5 text-sm font-medium text-heading">Confirm password</label>
        <input type="password" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400" placeholder="•••••••••" />
    </div>  -->
      <div class="flex items-start mb-6">
        <!-- <div class="flex items-center h-5">
        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-500" required />
        </div>
        <label for="remember" class="ms-2 text-sm font-medium text-heading">I agree with the <a href="#" class="text-fg-brand hover:underline">terms and conditions</a>.</label> -->
        <p class="text-sm text-heading italic">* required fields</p>
      </div>
      <button type="submit"
        class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none">Submit</button>
    </form>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'side-bar'
})
</script>