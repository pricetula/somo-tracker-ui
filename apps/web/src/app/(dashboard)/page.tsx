import { Button } from "@somo-tracker-ui/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@somo-tracker-ui/ui/card";

export default function Home() {
    return (
        <div className="flex justify-center items-center h-full">
            <Card className="w-1/2">
                <CardHeader>
                    <CardTitle>Welcome to the Dashboard</CardTitle>
                    <CardDescription>This is a test of the new dark theme.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>The components should now be themed correctly.</p>
                </CardContent>
                <CardFooter>
                    <Button>Click me</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
