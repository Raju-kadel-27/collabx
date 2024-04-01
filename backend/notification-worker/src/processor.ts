interface SubscriptionType {
    subscription: 'INDIVIDUAL' | 'GROUP'
}

import { Redis } from './Redis';
import { notify } from './notifier';

