<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'

const open = ref(true)

const colorMode = useColorMode()

const teams = ref([
  {
    label: 'Factory',
    avatar: {
      src: 'https://github.com/nuxt.png',
      alt: 'Nuxt'
    }
  },
  {
    label: 'Admin',
    avatar: {
      src: 'https://github.com/vuejs.png',
      alt: 'Vue'
    }
  },
  {
    label: 'User',
    avatar: {
      src: 'https://github.com/unjs.png',
      alt: 'UnJS'
    }
  }
])
const selectedTeam = ref(teams.value[0])

const teamsItems = computed<DropdownMenuItem[][]>(() => {
  return [
    teams.value.map((team, index) => ({
      ...team,
      kbds: ['meta', String(index + 1)],
      onSelect() {
        selectedTeam.value = team
      },
      
    })),
    [
      {
        label: 'Create team',
        icon: 'i-lucide-circle-plus'
      }
    ]
  ]
})

function getItems(state: 'collapsed' | 'expanded') {
  return [
    {
      label: 'Dashboard',
      icon: 'i-lucide-house',
      to: '/home'
    },
    {
      
      label: 'Customer Center',
      icon: 'i-lucide-users',
      children: [
        {
          label: 'Add Customer',
          icon: 'i-lucide-plus',
          to: '/customers/addcustomer'
        },
        {
          label: 'View Customers',
          icon: 'i-lucide-eye',
          to: '/customers/viewCustomers'
        },
        {
          label: 'Sales Orders',
          icon: 'i-lucide-shopping-cart',
          children: [
            {
              label: 'Add Sales Order',
              icon: 'i-lucide-plus',
              to: '/customers/salesorders/addsalesorder'
            },
            {
              label: 'Sales Orders List',
              icon: 'i-lucide-eye',
              to: '/customers/salesorders/viewsaleorder'
            },
            
            
          ]
        },
        {
          label: 'Sales Invoices',
          icon: 'i-lucide-file-text',
          children: [
            {
              label: 'Create Invoice',
              icon: 'i-lucide-plus',
              to: '/customers/salesinvoices/createinvoice'
            },
            {
              label: 'View Sales Invoices',
              icon: 'i-lucide-eye',
              to: '/customers/salesinvoices/viewinvoices'
            },
            {
              label: 'Edit Sales Invoice',
              icon: 'i-lucide-edit'
            },
            {
              label: 'Delete Sales Invoice',
              icon: 'i-lucide-trash'
            },
            {
              label: 'Search Sales Invoice',
              icon: 'i-lucide-search'
            },
            {
              label: 'Filter Sales Invoice',
              icon: 'i-lucide-filter'
            },
            {
              label: 'Sort Sales Invoice',
              icon: 'i-lucide-sort-asc'
            }
          ]
        },
        {
          label: 'Sales Returns',
          icon: 'i-lucide-rotate-cw',
          children: [
            {
              label: 'Add Sales Return',
              icon: 'i-lucide-plus'
            },
            {
              label: 'View Sales Returns',
              icon: 'i-lucide-eye'
            },
            {
              label: 'Edit Sales Return',
              icon: 'i-lucide-edit'
            },
            {
              label: 'Delete Sales Return',
              icon: 'i-lucide-trash'
            },
            {
              label: 'Search Sales Return',
              icon: 'i-lucide-search'
            },
            {
              label: 'Filter Sales Return',
              icon: 'i-lucide-filter'
            },
            {
              label: 'Sort Sales Return',
              icon: 'i-lucide-sort-asc'
            }
          ]
        },
        {
          label: 'Cash Sales',
          icon: 'i-lucide-credit-card',
          children: [
            {
              label: 'Add Cash Sale',
              icon: 'i-lucide-plus'
            },
            {
              label: 'View Cash Sales',
              icon: 'i-lucide-eye'
            },
            {
              label: 'Edit Cash Sale',
              icon: 'i-lucide-edit'
            },
            {
              label: 'Delete Cash Sale',
              icon: 'i-lucide-trash'
            },
            {
              label: 'Search Cash Sale',
              icon: 'i-lucide-search'
            },
            {
              label: 'Filter Cash Sale',
              icon: 'i-lucide-filter'
            },
            {
              label: 'Sort Cash Sale',
              icon: 'i-lucide-sort-asc'
            }
          ]
        },
        
        {
          label: 'Receive Payments',
          icon: 'i-lucide-credit-card',
          children: [
            {
              label: 'Add Sales Payment',
              icon: 'i-lucide-plus'
            },
            {
              label: 'View Sales Payments',
              icon: 'i-lucide-eye'
            },
            {
              label: 'Edit Sales Payment',
              icon: 'i-lucide-edit'
            },
            {
              label: 'Delete Sales Payment',
              icon: 'i-lucide-trash'
            },
            {
              label: 'Search Sales Payment',
              icon: 'i-lucide-search'
            },
            {
              label: 'Filter Sales Payment',
              icon: 'i-lucide-filter'
            },
            {
              label: 'Sort Sales Payment',
              icon: 'i-lucide-sort-asc'
            }
          ]
        },
        
      ]
      // badge: '4'
    },
    {
      label: 'Vendor Center',
      icon: 'i-lucide-users',
      children: [
        {
          label: 'Add Vendor',
          icon: 'i-lucide-plus',
          to: '/vendors/addvendors'
        },
        {
          label: 'View Vendors',
          icon: 'i-lucide-eye',
          to: '/vendors/viewVendors'
        },
        // {
        //   label: 'Edit Vendor',
        //   icon: 'i-lucide-edit'
        // },
        // {
        //   label: 'Delete Vendor',
        //   icon: 'i-lucide-trash'
        // },
        {
          label: 'Search Vendor',
          icon: 'i-lucide-search'
        },
        {
          label: 'Filter Vendor',
          icon: 'i-lucide-filter'
        },
        {
          label: 'Sort Vendor',
          icon: 'i-lucide-sort-asc'
        },
        {
          label: 'Purchase Orders',
          icon: 'i-lucide-credit-card',
          children: [
            {
              label: 'Add Purchase Order',
              icon: 'i-lucide-plus'
            },
            {
              label: 'View Purchase Orders',
              icon: 'i-lucide-eye',
              to: '/vendors/purchaseorders/purchaseorders'
            },
            {
              label: 'Edit Purchase Order',
              icon: 'i-lucide-edit'
            },
            {
              label: 'Delete Purchase Order',
              icon: 'i-lucide-trash'
            },
            {
              label: 'Search Purchase Order',
              icon: 'i-lucide-search'
            },
            {
              label: 'Filter Purchase Order',
              icon: 'i-lucide-filter'
            },
            {
              label: 'Sort Purchase Order',
              icon: 'i-lucide-sort-asc'
            }
          ]
        },
        {
          label: 'Bills',
          icon: 'i-lucide-file-text',
          children: [
            {
              label: 'Add Bill',
              icon: 'i-lucide-plus'
            },
            {
              label: 'View Bills',
              icon: 'i-lucide-eye'
            },
            {
              label: 'Edit Bill',
              icon: 'i-lucide-edit'
            },
            {
              label: 'Delete Bill',
              icon: 'i-lucide-trash'
            },
            {
              label: 'Search Bill',
              icon: 'i-lucide-search'
            },
            {
              label: 'Filter Bill',
              icon: 'i-lucide-filter'
            },
            {
              label: 'Sort Bill',
              icon: 'i-lucide-sort-asc'
            }
          ]
        },
        {
          label: 'Purchase Returns',
          icon: 'i-lucide-file-text',
          children: [
            {
              label: 'Add Return',
              icon: 'i-lucide-plus'
            },
            {
              label: 'View Returns',
              icon: 'i-lucide-eye'
            },
            {
              label: 'Edit Return',
              icon: 'i-lucide-edit'
            },
            {
              label: 'Delete Return',
              icon: 'i-lucide-trash'
            },
            {
              label: 'Search Return',
              icon: 'i-lucide-search'
            },
            {
              label: 'Filter Return',
              icon: 'i-lucide-filter'
            },
            {
              label: 'Sort Return',
              icon: 'i-lucide-sort-asc'
            }
          ]
        },
        {
          label: 'Expenses',
          icon: 'i-lucide-file-text',
          children: [
            {
              label: 'Add Expense',
              icon: 'i-lucide-plus'
            },
            {
              label: 'View Expenses',
              icon: 'i-lucide-eye'
            },
            {
              label: 'Edit Expense',
              icon: 'i-lucide-edit'
            },
            {
              label: 'Delete Expense',
              icon: 'i-lucide-trash'
            },
            {
              label: 'Search Expense',
              icon: 'i-lucide-search'
            },
            {
              label: 'Filter Expense',
              icon: 'i-lucide-filter'
            },
            {
              label: 'Sort Expense',
              icon: 'i-lucide-sort-asc'
            }
          ]
        },
        {
          label: 'Payments',
          icon: 'i-lucide-credit-card',
          children: [
            {
              label: 'Add Payment',
              icon: 'i-lucide-plus'
            },
            {
              label: 'View Payments',
              icon: 'i-lucide-eye'
            },
            {
              label: 'Edit Payment',
              icon: 'i-lucide-edit'
            },
            {
              label: 'Delete Payment',
              icon: 'i-lucide-trash'
            },
            {
              label: 'Search Payment',
              icon: 'i-lucide-search'
            },
            {
              label: 'Filter Payment',
              icon: 'i-lucide-filter'
            },
            {
              label: 'Sort Payment',
              icon: 'i-lucide-sort-asc'
            }
          ]
        }
      ]
    },
    {
      label: 'Inventory',
      icon: 'i-lucide-box',
      children: [
        {
          label: 'Add Inventory',
          icon: 'i-lucide-plus'
        },
        {
          label: 'View Inventory',
          icon: 'i-lucide-eye',
          to: '/inventory/inventory'
        },
        {
          label: 'Edit Inventory',
          icon: 'i-lucide-edit'
        },
        {
          label: 'Delete Inventory',
          icon: 'i-lucide-trash'
        },
        {
          label: 'Search Inventory',
          icon: 'i-lucide-search'
        },
        {
          label: 'Filter Inventory',
          icon: 'i-lucide-filter'
        },
        {
          label: 'Sort Inventory',
          icon: 'i-lucide-sort-asc'
        }
      ]
    },
    {
      label: 'Products',
      icon: 'i-lucide-box',
      children: [
        {
          label: 'Add Product',
          icon: 'i-lucide-plus',
          to: '/products/addproduct'
        },
        {
          label: 'View Products',
          icon: 'i-lucide-eye',
          to: '/products/viewproducts'
        },
        {
          label: 'Edit Product',
          icon: 'i-lucide-edit'
        },
        {
          label: 'Delete Product',
          icon: 'i-lucide-trash'
        },
        {
          label: 'Search Product',
          icon: 'i-lucide-search'
        },
        {
          label: 'Filter Product',
          icon: 'i-lucide-filter'
        },
        {
          label: 'Sort Product',
          icon: 'i-lucide-sort-asc'
        }
      ]
    },
    {
      label: 'Accounting',
      icon: 'i-lucide-calculator',
      children: [
        {
          label: 'Add Transaction',
          icon: 'i-lucide-plus'
        },
        {
          label: 'View Transactions',
          icon: 'i-lucide-eye'
        },
        {
          label: 'Edit Transaction',
          icon: 'i-lucide-edit'
        },
        {
          label: 'Delete Transaction',
          icon: 'i-lucide-trash'
        },
        {
          label: 'Search Transaction',
          icon: 'i-lucide-search'
        },
        {
          label: 'Filter Transaction',
          icon: 'i-lucide-filter'
        },
        {
          label: 'Sort Transaction',
          icon: 'i-lucide-sort-asc'
        }
      ]
    },
    {
      label: 'Reports',
      icon: 'i-lucide-file-text',
      children: [
        {
          label: 'Sales Report',
          icon: 'i-lucide-file-text'
        },
        {
          label: 'Purchase Report',
          icon: 'i-lucide-file-text'
        },
        {
          label: 'Inventory Report',
          icon: 'i-lucide-file-text'
        }
      ]
    },
    {
      label: 'Settings',
      icon: 'i-lucide-settings',
      defaultOpen: true,
      children:
        state === 'expanded'
          ? [
              {
                label: 'General',
                icon: 'i-lucide-house'
              },
              {
                label: 'Team',
                icon: 'i-lucide-users'
              },
              {
                label: 'Billing',
                icon: 'i-lucide-credit-card'
              }
            ]
          : []
    }
  ] satisfies NavigationMenuItem[]
}

const user = ref({
  name: 'Benjamin Canac',
  avatar: {
    src: 'https://github.com/benjamincanac.png',
    alt: 'Benjamin Canac'
  }
})

const userItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user'
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card'
    },
    {
      label: 'Settings',
      icon: 'i-lucide-settings',
      to: '/settings'
    }
  ],
  [
    {
      label: 'Appearance',
      icon: 'i-lucide-sun-moon',
      children: [
        {
          label: 'Light',
          icon: 'i-lucide-sun',
          type: 'checkbox',
          checked: colorMode.value === 'light',
          onUpdateChecked(checked: boolean) {
            if (checked) {
              colorMode.preference = 'light'
            }
          },
          onSelect(e: Event) {
            e.preventDefault()
          }
        },
        {
          label: 'Dark',
          icon: 'i-lucide-moon',
          type: 'checkbox',
          checked: colorMode.value === 'dark',
          onUpdateChecked(checked: boolean) {
            if (checked) {
              colorMode.preference = 'dark'
            }
          },
          onSelect(e: Event) {
            e.preventDefault()
          }
        }
      ]
    }
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/nuxt/ui',
      target: '_blank'
    },
    {
      label: 'Log out',
      icon: 'i-lucide-log-out'
    }
  ]
])

defineShortcuts(extractShortcuts(teamsItems.value))
</script>

<template>
  <div class="flex flex-1">
    <USidebar
      v-model:open="open"
      collapsible="icon"
      rail
      :ui="{
        container: 'h-full',
        inner: 'bg-elevated/25 divide-transparent',
        body: 'py-0'
      }"
    >
      <template #header>
        <UDropdownMenu
          :items="teamsItems"
          :content="{ align: 'start', collisionPadding: 12 }"
          :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-48' }"
        >
          <UButton
            v-bind="selectedTeam"
            trailing-icon="i-lucide-chevrons-up-down"
            color="neutral"
            variant="ghost"
            square
            class="w-full data-[state=open]:bg-elevated overflow-hidden"
            :ui="{
              trailingIcon: 'text-dimmed ms-auto'
            }"
          />
        </UDropdownMenu>
      </template>

      <template #default="{ state }">
        <UNavigationMenu
          :key="state"
          :items="getItems(state)"
          orientation="vertical"
          :ui="{ link: 'p-1.5 overflow-hidden text-gray-800 hover:bg-[#5E7AC4] hover:text-white' }"
          
        />
        <!-- :ui="{ link: 'p-1.5 overflow-hidden text-black hover:bg-blue-400 hover:text-white data-[active=true]:bg-blue-500 data-[active=true]:text-white' }" -->
      </template>

      <template #footer>
        <UDropdownMenu
          :items="userItems"
          :content="{ align: 'center', collisionPadding: 12 }"
          :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-48' }"
        >
          <UButton
            v-bind="user"
            :label="user?.name"
            trailing-icon="i-lucide-chevrons-up-down"
            color="neutral"
            variant="ghost"
            square
            class="w-full data-[state=open]:bg-elevated overflow-hidden"
            :ui="{
              trailingIcon: 'text-dimmed ms-auto'
            }"
          />
        </UDropdownMenu>
      </template>
    </USidebar>

    <div class="flex-1 flex flex-col">
      <div class="h-(--ui-header-height) shrink-0 flex items-center px-4 border-b border-default">
        <UButton
          icon="i-lucide-panel-left"
          color="neutral"
          variant="ghost"
          aria-label="Toggle sidebar"
          @click="open = !open"
        />
      </div>

      <div class="flex-1 p-4">
        <slot />
      </div>
    </div>
  </div>
</template>
