//package com.chowington.recurrentreminders;
//import com.facebook.react.bridge.NativeModule;
//import com.facebook.react.bridge.ReactApplicationContext;
//import com.facebook.react.bridge.ReactContext;
//import com.facebook.react.bridge.ReactContextBaseJavaModule;
//import com.facebook.react.bridge.ReactMethod;
//import java.util.Map;
//import java.util.HashMap;
//
//import android.app.NotificationChannel;
//import android.app.NotificationManager;
//import android.os.Build;
//import android.util.Log;
//
//import androidx.core.app.NotificationCompat;
//
//public class NotificationsModule extends ReactContextBaseJavaModule {
//    NotificationsModule(ReactApplicationContext context) {
//        super(context);
//    }
//
//    @Override
//    public String getName() {
//        return "NotificationsModule";
//    }
//
//    @ReactMethod
//    private void createNotificationChannel(String id, String name) {
//        // Create the NotificationChannel, but only on API 26+ because
//        // the NotificationChannel class is new and not in the support library
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
////            CharSequence name = getString(R.string.channel_name);
////            String description = getString(R.string.channel_description);
//            int importance = NotificationManager.IMPORTANCE_DEFAULT;
//            NotificationChannel channel = new NotificationChannel(id, name, importance);
////            channel.setDescription(description);
//            // Register the channel with the system; you can't change the importance
//            // or other notification behaviors after this
////            NotificationManager notificationManager = getSystemService(NotificationManager.class);
//            NotificationManager notificationManager = (NotificationManager) getReactApplicationContext().getSystemService("Context.NOTIFICATION_SERVICE");
//            notificationManager.createNotificationChannel(channel);
//        }
//    }
//
//    @ReactMethod
////    public void createRemindersNotification(long interval) {
//    public void createRemindersNotification(String channel_id) {
////        Log.d("NotificationsModule", "Logged from NotificationsModule");
//        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, channel_id)
//                .setSmallIcon(R.drawable.ic_stat_name)
//                .setContentTitle("Recurrent Reminders")
//                .setContentText("Check out your available goals for today!")
//                .setPriority(NotificationCompat.PRIORITY_DEFAULT);
//    }
//}
