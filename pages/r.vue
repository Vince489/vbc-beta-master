<script setup>
import { ref, computed, watch } from 'vue';
import { useAuthStore } from '~/stores/authStore';

const firstName = ref('');
const lastName = ref('');
const nickname = ref('');
const stance = ref('');
const ovr = ref(78);
const height = ref(64);
const reach = ref(61);
const naturalWeightDivision = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const authStore = useAuthStore();

const minHeight = ref(64);
const maxHeight = ref(80);
const maxReach = ref(86);

// Weight division options
const weightDivisions = [
  { value: '100-112: Fly', label: 'Fly', range: '100-112', maxReach: 66 },
  { value: '112-118: Bantam', label: 'Bantam', range: '112-118', maxReach: 68 },
  { value: '118-126: Feather', label: 'Feather', range: '118-126', maxReach: 70 },
  { value: '126-135: Light', label: 'Light', range: '126-135', maxReach: 72 },
  { value: '135-147: Welter', label: 'Welter', range: '135-147', maxReach: 74 },
  { value: '147-160: Middle', label: 'Middle', range: '147-160', maxReach: 76 },
  { value: '160-175: L Heavy', label: 'L Heavy', range: '160-175', maxReach: 82 },
  { value: '200-260: Heavy', label: 'Heavy', range: '200-260', maxReach: 86}
];

const selectedWeightClass = ref('Flyweight');
const weightClasses = [
  { value: 'Flyweight', label: 'Flyweight (108-112 lbs)' },
  { value: 'Super Flyweight', label: 'Super Flyweight (112-115 lbs)' },
  { value: 'Bantamweight', label: 'Bantamweight (115-118 lbs)' },
  { value: 'Super Bantamweight', label: 'Super Bantamweight (118-122 lbs)' },
  { value: 'Featherweight', label: 'Featherweight (122-126 lbs)' },
  { value: 'Super Featherweight', label: 'Super Featherweight (126-130 lbs)' },
  { value: 'Lightweight', label: 'Lightweight (130–135 lbs)' },
  { value: 'Super Lightweight', label: 'Super Lightweight (135–140 lbs)' },
  { value: 'Welterweight', label: 'Welterweight (140–147 lbs)' },
  { value: 'Super Welterweight', label: 'Super Welterweight (147–154 lbs)' },
  { value: 'Middleweight', label: 'Middleweight (154–160 lbs)' },
  { value: 'Super Middleweight', label: 'Super Middleweight (160–168 lbs)' },
  { value: 'Light Heavyweight', label: 'Light Heavyweight (168–175 lbs)' },
  { value: 'Cruiserweight', label: 'Cruiserweight (175–200 lbs)' },
  { value: 'Heavyweight', label: 'Heavyweight (200+ lbs)' }
];

// Overall Levels
const overallLevels = computed(() => Array.from({ length: 91 - 78 + 1 }, (_, i) => 78 + i));

// Watcher for natural weight division
watch(naturalWeightDivision, (newVal) => {
  // Update max reach based on selected weight division
  const division = weightDivisions.find(div => div.value.split(': ')[1] === newVal);
  if (division) {
    maxReach.value = division.maxReach;
  }

  // Reset reach if it exceeds the new maxReach
  if (reach.value > maxReach.value) {
    reach.value = maxReach.value;
  }
}, { deep: true });

// Computed properties for feet and inches
const feet = computed(() => Math.floor(height.value / 12));
const inches = computed(() => height.value % 12);

// Function to register a fighter
const registerFighter = async () => {
  const newFighterData = {
    firstName: firstName.value,
    lastName: lastName.value,
    nickname: nickname.value,
    stance: stance.value,
    ovr: ovr.value,
    heightFt: feet.value,
    heightIn: inches.value,
    reach: reach.value,
    naturalWeightDivision: naturalWeightDivision.value,
    weightClass: selectedWeightClass.value
  };

  try {
    const success = await authStore.registerFighter(newFighterData);
    if (success) {
      successMessage.value = 'Fighter registered successfully!';
      errorMessage.value = '';
    } else {
      errorMessage.value = 'An error occurred while registering the fighter.';
      successMessage.value = '';
    }
  } catch (error) {
    errorMessage.value = error.message;
    successMessage.value = '';
  }
};

</script>
