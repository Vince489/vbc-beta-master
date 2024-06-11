<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/authStore'

const authStore = useAuthStore();

const fighter = ref({
  firstName: '',
  lastName: '',
  nickname: '',
  stance: '',
  ovr: 78,
  naturalWeightDivision: '',
  reach: 50, // initial reach value
  heightValue: 64, // initial height value  
});

const minHeight = ref(64);
const maxHeight = ref(80);
const maxReach = ref(86);

// Weight division options
const weightDivisions = [
  { value: '100-112: Fly', label: 'Fly', range: '100-112' },
  { value: '112-118: Bantam', label: 'Bantam', range: '112-118' },
  { value: '118-126: Feather', label: 'Feather', range: '118-126' },
  { value: '126-135: Light', label: 'Light', range: '126-135' },
  { value: '135-147: Welter', label: 'Welter', range: '135-147' },
  { value: '147-160: Middle', label: 'Middle', range: '147-160' },
  { value: '160-175: Light Heavy', label: 'L Heavy', range: '160-175' },
  { value: '200-260: Heavy', label: 'Heavy', range: '200-260' }
];

watch(fighter, (newVal) => {
  // Update max reach and max height based on selected weight division
  const division = weightDivisions.find(div => div.value === newVal.naturalWeightDivision);
  if (division) {
    const [minRange, maxRange] = division.range.split('-');
    maxReach.value = Math.min(86, Number(maxRange) + 5);
    maxHeight.value = Math.min(80, Number(maxRange) + 3); // Assuming average increase in height
  }

  // Reset reach if it exceeds the new maxReach
  if (newVal.reach > maxReach.value) {
    newVal.reach = maxReach.value;
  }
  // Reset height if it exceeds the new maxHeight
  if (newVal.heightValue > maxHeight.value) {
    newVal.heightValue = maxHeight.value;
  }
}, { deep: true });

watch(() => fighter.value.heightValue, (newVal) => {
  // Ensure heightValue stays within the allowed range
  if (newVal < minHeight.value) {
    fighter.value.heightValue = minHeight.value;
  } else if (newVal > maxHeight.value) {
    fighter.value.heightValue = maxHeight.value;
  }
});

const feet = computed(() => Math.floor(fighter.value.heightValue / 12))
const inches = computed(() => fighter.value.heightValue % 12)

const registerFighter = async () => {
  try {
    const response = await fetch('http://localhost:5550/api/v1/fighter/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`
      },
      body: JSON.stringify({
        firstName: fighter.value.firstName,
        lastName: fighter.value.lastName,
        nickname: fighter.value.nickname,
        stance: fighter.value.stance,
        ovr: fighter.value.ovr,
        heightFt: fighter.value.heightFt,
        heightIn: fighter.value.heightIn,
        reach: fighter.value.reach,
        naturalWeightDivision: fighter.value.naturalWeightDivision
      })
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred while registering the fighter.')
    }

    console.log('Fighter registered successfully!')
  } catch (error) {
    console.error('An error occurred:', error.message)
  }
}
</script>