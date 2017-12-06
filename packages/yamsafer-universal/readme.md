
```js
import { createServer } from 'yamsafer-universal-web';
const { serve } = createServer({
     reduers: [],
     routes: {},
     sagas: [],
     bootstrap(context) {},
})

serve(req, res);
``` 


```js
import { createClient } from 'yamsafer-universal-web';

const {  } = createClient({
   reduers: [],
   routes: {},
   sagas: [],
   middlewares: [],
   bootstrap(context) {},
});


``` 
