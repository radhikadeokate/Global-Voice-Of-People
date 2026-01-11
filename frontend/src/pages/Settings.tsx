import { motion } from 'framer-motion';
import { User, Bell, Shield, Database, Palette, Globe } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'data', label: 'Data Sources', icon: Database },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'regional', label: 'Regional', icon: Globe },
];

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold gradient-text">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure your GVOP experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <GlassCard className="lg:col-span-1 h-fit">
          <nav className="space-y-1">
            {settingsSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-left"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{section.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </GlassCard>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile */}
          <GlassCard>
            <h3 className="text-lg font-medium mb-4">Profile Settings</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input id="name" placeholder="Your name" defaultValue="Analyst" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="org">Organization</Label>
                <Input id="org" placeholder="Your organization" />
              </div>
            </div>
          </GlassCard>

          {/* Notifications */}
          <GlassCard>
            <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Real-time alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified on significant sentiment shifts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Daily digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a daily summary email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Weekly reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Automated weekly analysis reports
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </GlassCard>

          {/* Data Sources */}
          <GlassCard>
            <h3 className="text-lg font-medium mb-4">Data Sources</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>News outlets</Label>
                  <p className="text-sm text-muted-foreground">2,847 sources active</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Social media</Label>
                  <p className="text-sm text-muted-foreground">Twitter, Reddit, forums</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Government sources</Label>
                  <p className="text-sm text-muted-foreground">Official statements and releases</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </GlassCard>

          {/* Regional */}
          <GlassCard>
            <h3 className="text-lg font-medium mb-4">Regional Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Primary Region</Label>
                <Select defaultValue="global">
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="eu">Europe</SelectItem>
                    <SelectItem value="asia">Asia Pacific</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </GlassCard>

          {/* Save */}
          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
